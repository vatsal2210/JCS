require("dotenv").config();

const http = require("http");
const https = require("https");
const express = require("express");
const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const TRUST_PROXY = process.env.TRUST_PROXY === "true";
const FORCE_HTTPS = process.env.FORCE_HTTPS === "true";
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || "";
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || "";
const DATA_DIR = path.join(__dirname, "server-data");
const ADMINS_FILE = path.join(DATA_DIR, "admins.json");

const sessions = new Map();

if (TRUST_PROXY) {
    app.set("trust proxy", 1);
}

app.use(express.json());

if (FORCE_HTTPS) {
    app.use((req, res, next) => {
        if (req.secure || req.headers["x-forwarded-proto"] === "https") {
            return next();
        }

        const host = req.headers.host;
        return res.redirect(301, `https://${host}${req.originalUrl}`);
    });
}

function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
}

function toSafeAdmin(admin) {
    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role || "admin"
    };
}

function hashPassword(password, salt) {
    return crypto.scryptSync(String(password || ""), salt, 64).toString("hex");
}

function createPasswordRecord(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    return {
        salt,
        hash: hashPassword(password, salt)
    };
}

function verifyPassword(password, admin) {
    if (!admin?.passwordSalt || !admin?.passwordHash) return false;
    const hash = hashPassword(password, admin.passwordSalt);
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(admin.passwordHash, "hex"));
}

async function ensureAdminsFile() {
    await fsp.mkdir(DATA_DIR, { recursive: true });

    if (fs.existsSync(ADMINS_FILE)) {
        return;
    }

    const superName = process.env.SUPERADMIN_NAME || "smruti";
    const superEmail = normalizeEmail(process.env.SUPERADMIN_EMAIL || "smruti");
    const superPassword = process.env.SUPERADMIN_PASSWORD || "ChangeMe123!";
    const passwordRecord = createPasswordRecord(superPassword);

    const seedAdmins = [
        {
            id: "smruti",
            name: superName,
            email: superEmail,
            role: "superuser",
            passwordSalt: passwordRecord.salt,
            passwordHash: passwordRecord.hash
        }
    ];

    await fsp.writeFile(ADMINS_FILE, JSON.stringify(seedAdmins, null, 2));
}

function validateRequiredConfig() {
    const missing = [];

    if (!process.env.SUPERADMIN_EMAIL) {
        missing.push("SUPERADMIN_EMAIL");
    }
    if (!process.env.SUPERADMIN_PASSWORD) {
        missing.push("SUPERADMIN_PASSWORD");
    }

    if (missing.length) {
        console.warn(`Missing env vars: ${missing.join(", ")}. Default fallback values may be used.`);
    }
}

async function readAdmins() {
    await ensureAdminsFile();
    const raw = await fsp.readFile(ADMINS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
}

async function writeAdmins(admins) {
    await ensureAdminsFile();
    await fsp.writeFile(ADMINS_FILE, JSON.stringify(admins, null, 2));
}

async function requireAdmin(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    const session = token ? sessions.get(token) : null;

    if (!session) {
        return res.status(401).json({ error: "Unauthorized." });
    }

    const admins = await readAdmins();
    const admin = admins.find((item) => item.email === session.email);

    if (!admin) {
        sessions.delete(token);
        return res.status(401).json({ error: "Unauthorized." });
    }

    req.admin = admin;
    req.sessionToken = token;
    next();
}

function requireSuperUser(req, res, next) {
    if (req.admin?.role !== "superuser") {
        return res.status(403).json({ error: "Super user access required." });
    }
    next();
}

app.post("/api/admin/login", async (req, res) => {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");
    const admins = await readAdmins();
    const admin = admins.find((item) => item.email === email);

    if (!admin || !verifyPassword(password, admin)) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = crypto.randomBytes(24).toString("hex");
    sessions.set(token, {
        email: admin.email,
        createdAt: Date.now()
    });

    res.json({
        token,
        user: toSafeAdmin(admin)
    });
});

app.get("/api/admin/session", requireAdmin, async (req, res) => {
    res.json({ user: toSafeAdmin(req.admin) });
});

app.post("/api/admin/logout", requireAdmin, async (req, res) => {
    sessions.delete(req.sessionToken);
    res.json({ ok: true });
});

app.get("/api/admin/users", requireAdmin, requireSuperUser, async (req, res) => {
    const admins = await readAdmins();
    res.json({
        users: admins.map(toSafeAdmin)
    });
});

app.delete("/api/admin/users/:email", requireAdmin, requireSuperUser, async (req, res) => {
    const targetEmail = normalizeEmail(req.params.email);

    if (!targetEmail) {
        return res.status(400).json({ error: "Email is required." });
    }

    if (targetEmail === req.admin.email) {
        return res.status(400).json({ error: "You cannot remove your own account." });
    }

    const admins = await readAdmins();
    const nextAdmins = admins.filter((admin) => admin.email !== targetEmail);

    if (nextAdmins.length === admins.length) {
        return res.status(404).json({ error: "Admin not found." });
    }

    await writeAdmins(nextAdmins);

    for (const [token, session] of sessions.entries()) {
        if (session.email === targetEmail) {
            sessions.delete(token);
        }
    }

    res.json({ ok: true });
});

app.get("/api/health", (req, res) => {
    res.json({
        ok: true,
        service: "jcs-admin-site"
    });
});

app.get("/admin", (req, res) => {
    res.redirect("/admin.html");
});

app.use(express.static(__dirname));

app.use((req, res) => {
    res.status(404).json({ error: "Not found." });
});

async function startServer() {
    validateRequiredConfig();
    await ensureAdminsFile();
    const useHttps = Boolean(SSL_KEY_PATH && SSL_CERT_PATH);

    let server;

    if (useHttps) {
        const key = await fsp.readFile(path.resolve(SSL_KEY_PATH));
        const cert = await fsp.readFile(path.resolve(SSL_CERT_PATH));
        server = https.createServer({ key, cert }, app);
    } else {
        server = http.createServer(app);
    }

    server.listen(PORT, HOST, () => {
        const protocol = useHttps ? "https" : "http";
        console.log(`JCS site running on ${protocol}://${HOST}:${PORT}`);
    });

    server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            console.error(`Port ${PORT} is already in use. Stop the existing process or change PORT in your environment.`);
            process.exit(1);
        }

        console.error("Server failed to start:", error);
        process.exit(1);
    });
}

startServer().catch((error) => {
    console.error("Startup failed:", error);
    process.exit(1);
});
