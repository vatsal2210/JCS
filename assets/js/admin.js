const DRAFT_KEYS = {
    event: "jcs_admin_event_draft",
    announcement: "jcs_admin_announcement_draft"
};

let currentAdmin = null;
let approvedAdmins = Array.isArray(window.JCS_APPROVED_ADMINS) ? window.JCS_APPROVED_ADMINS : [];

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error(`Unable to read file: ${file.name}`));
        reader.readAsDataURL(file);
    });
}

function formatInputDate(value) {
    if (!value) return "";
    return window.JCSContentStore.formatDisplayDate(new Date(`${value}T12:00:00`));
}

function readDraft(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : {};
    } catch (error) {
        console.error(`Unable to read draft key: ${key}`, error);
        return {};
    }
}

function writeDraft(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Unable to save draft key: ${key}`, error);
    }
}

function clearDraft(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Unable to clear draft key: ${key}`, error);
    }
}

function restoreFormFields(form, draft) {
    if (!form || !draft) return;

    Object.entries(draft).forEach(([name, value]) => {
        const field = form.elements.namedItem(name);
        if (!field || field.type === "file") return;
        field.value = value;
    });
}

function watchDraftFields(form, storageKey) {
    if (!form) return;

    const saveDraft = () => {
        const draft = {};
        Array.from(form.elements).forEach((field) => {
            if (!field.name || field.disabled || field.type === "file") return;
            draft[field.name] = field.value;
        });
        writeDraft(storageKey, draft);
    };

    form.addEventListener("input", saveDraft);
    form.addEventListener("change", saveDraft);
}

function setMessage(element, text, type) {
    if (!element) return;
    element.className = `admin-inline-message ${type || ""}`;
    element.textContent = text || "";
}

function getCurrentAdmin() {
    return currentAdmin;
}

function isSuperUser() {
    return currentAdmin?.role === "superuser";
}

async function sha256Hex(value) {
    const bytes = new TextEncoder().encode(String(value || ""));
    const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function authenticateAdmin(email, password) {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const passwordHash = await sha256Hex(password);

    return approvedAdmins.find((admin) => {
        return String(admin.email || "").trim().toLowerCase() === normalizedEmail
            && String(admin.passwordHash || "") === passwordHash;
    }) || null;
}

function updateOverviewMetrics() {
    const eventCount = document.getElementById("adminEventCount");
    const announcementCount = document.getElementById("adminAnnouncementCount");
    const adminCount = document.getElementById("adminUserCount");

    if (eventCount) {
        eventCount.textContent = window.JCSContentStore.getStoredEvents().length;
    }
    if (announcementCount) {
        announcementCount.textContent = window.JCSContentStore.getStoredAnnouncements().length;
    }
    if (adminCount) {
        adminCount.textContent = approvedAdmins.length;
    }
}

function renderSettingsPanel() {
    const toggle = document.getElementById("adminPageVisibleSetting");
    const status = document.getElementById("adminVisibilityStatus");
    if (!toggle) return;

    const settings = window.JCSContentStore.getSiteSettings();
    toggle.checked = Boolean(settings.adminPageVisible);

    if (status) {
        status.textContent = settings.adminPageVisible ? "Admin link visible in site navigation" : "Admin link hidden from site navigation";
    }
}

function toggleAdminView(isLoggedIn, user) {
    const authSection = document.getElementById("adminAuthSection");
    const dashboardSection = document.getElementById("adminDashboard");
    const sessionName = document.getElementById("adminSessionName");

    if (authSection) authSection.classList.toggle("d-none", isLoggedIn);
    if (dashboardSection) dashboardSection.classList.toggle("d-none", !isLoggedIn);
    if (sessionName) {
        sessionName.textContent = isLoggedIn && user ? user.name || user.email : "";
    }
}

function renderSavedEvents() {
    const container = document.getElementById("savedEventsList");
    if (!container) return;

    const events = window.JCSContentStore.getStoredEvents();
    if (!events.length) {
        container.innerHTML = '<p class="admin-empty-state mb-0">No admin-created events yet.</p>';
        return;
    }

    container.innerHTML = events.map((event) => `
        <div class="admin-saved-item">
            <div>
                <h4>${event.title}</h4>
                <p>${event.shortDescription}</p>
                <p class="admin-meta-line">Added by: ${event.createdBy?.name || event.createdBy?.email || "Unknown admin"}</p>
            </div>
            <button type="button" class="btn btn-outline-danger btn-sm" data-delete-event="${event.id}">Delete</button>
        </div>
    `).join("");
}

function renderSavedAnnouncements() {
    const container = document.getElementById("savedAnnouncementsList");
    if (!container) return;

    const announcements = window.JCSContentStore.getStoredAnnouncements();
    if (!announcements.length) {
        container.innerHTML = '<p class="admin-empty-state mb-0">No admin-created announcements yet.</p>';
        return;
    }

    container.innerHTML = announcements.map((announcement) => `
        <div class="admin-saved-item">
            <div>
                <h4>${announcement.title}</h4>
                <p>Announcement: ${announcement.date} | Event: ${announcement.eventDate}</p>
                <p class="admin-meta-line">Added by: ${announcement.createdBy?.name || announcement.createdBy?.email || "Unknown admin"}</p>
            </div>
            <button type="button" class="btn btn-outline-danger btn-sm" data-delete-announcement="${announcement.id}">Delete</button>
        </div>
    `).join("");
}

function renderApprovedAdmins() {
    const container = document.getElementById("registeredAdminsList");
    if (!container) return;

    if (!approvedAdmins.length) {
        container.innerHTML = '<p class="admin-empty-state mb-0">No approved admins available.</p>';
        return;
    }

    container.innerHTML = approvedAdmins.map((admin) => `
        <div class="admin-saved-item">
            <div>
                <h4>${admin.name || "Admin User"}</h4>
                <p>${admin.email}</p>
                <p class="admin-meta-line">Role: ${admin.role === "superuser" ? "Super User" : "Admin User"}</p>
            </div>
            ${isSuperUser() ? `<button type="button" class="btn btn-outline-danger btn-sm" data-delete-user="${admin.email}">Remove</button>` : ""}
        </div>
    `).join("");
}

function updatePermissionPanels() {
    const superOnlyBlocks = document.querySelectorAll("[data-super-only]");
    const superBadge = document.getElementById("adminRoleBadge");

    superOnlyBlocks.forEach((element) => {
        element.classList.toggle("d-none", !isSuperUser());
    });

    if (superBadge) {
        superBadge.textContent = isSuperUser() ? "Super User" : "Admin User";
    }
}

function refreshAdminLists() {
    renderSavedEvents();
    renderSavedAnnouncements();
    renderApprovedAdmins();
    updateOverviewMetrics();
    renderSettingsPanel();
}

document.addEventListener("click", (event) => {
    const eventDeleteId = event.target.closest("[data-delete-event]")?.dataset.deleteEvent;
    if (eventDeleteId) {
        window.JCSContentStore.deleteEvent(eventDeleteId);
        refreshAdminLists();
        return;
    }

    const announcementDeleteId = event.target.closest("[data-delete-announcement]")?.dataset.deleteAnnouncement;
    if (announcementDeleteId) {
        window.JCSContentStore.deleteAnnouncement(announcementDeleteId);
        refreshAdminLists();
        return;
    }

    const userDeleteEmail = event.target.closest("[data-delete-user]")?.dataset.deleteUser;
    if (userDeleteEmail) {
        if (!isSuperUser()) {
            window.alert("Only super user can remove admins.");
            return;
        }

        window.alert("To remove an admin, edit assets/js/admin-users.js and delete that user entry.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    currentAdmin = window.JCSContentStore.getCurrentUser();
    toggleAdminView(Boolean(currentAdmin), currentAdmin);
    refreshAdminLists();
    updatePermissionPanels();

    const todayField = document.getElementById("announcementDate");
    const loginForm = document.getElementById("loginForm");
    const eventForm = document.getElementById("eventAdminForm");
    const announcementForm = document.getElementById("announcementAdminForm");
    const logoutButton = document.getElementById("adminLogoutButton");
    const adminPageVisibleSetting = document.getElementById("adminPageVisibleSetting");

    restoreFormFields(eventForm, readDraft(DRAFT_KEYS.event));
    restoreFormFields(announcementForm, readDraft(DRAFT_KEYS.announcement));

    if (todayField && !todayField.value) {
        todayField.value = window.JCSContentStore.formatDisplayDate(new Date());
    }

    watchDraftFields(eventForm, DRAFT_KEYS.event);
    watchDraftFields(announcementForm, DRAFT_KEYS.announcement);

    if (adminPageVisibleSetting) {
        adminPageVisibleSetting.addEventListener("change", () => {
            window.JCSContentStore.updateSiteSettings({
                adminPageVisible: adminPageVisibleSetting.checked
            });
            renderSettingsPanel();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const message = document.getElementById("loginMessage");

            try {
                const admin = await authenticateAdmin(
                    formData.get("loginEmail"),
                    formData.get("loginPassword")
                );

                if (!admin) {
                    throw new Error("Invalid email or password.");
                }

                currentAdmin = {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role || "admin"
                };

                window.JCSContentStore.setCurrentUser(currentAdmin);
                loginForm.reset();
                toggleAdminView(true, currentAdmin);
                refreshAdminLists();
                updatePermissionPanels();
                setMessage(message, "Login successful.", "success");
            } catch (error) {
                currentAdmin = null;
                window.JCSContentStore.logoutUser();
                setMessage(message, error.message || "Unable to log in.", "error");
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            currentAdmin = null;
            toggleAdminView(false, null);
            window.JCSContentStore.logoutUser();
            updatePermissionPanels();
        });
    }

    if (eventForm) {
        eventForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(eventForm);
            const imageFiles = Array.from(document.getElementById("eventImages").files || []);
            const message = document.getElementById("eventFormMessage");

            if (!imageFiles.length) {
                setMessage(message, "Please upload at least one event image.", "error");
                return;
            }

            try {
                const images = await Promise.all(imageFiles.map(async (file) => ({
                    src: await readFileAsDataUrl(file),
                    alt: file.name.replace(/\.[^.]+$/, "")
                })));

                window.JCSContentStore.saveEvent({
                    title: formData.get("eventTitle"),
                    shortDescription: formData.get("eventShortDescription"),
                    fullDescription: formData.get("eventFullDescription"),
                    images,
                    createdBy: getCurrentAdmin()
                });

                eventForm.reset();
                clearDraft(DRAFT_KEYS.event);
                setMessage(message, "Event saved and ready on the public events page.", "success");
                refreshAdminLists();
            } catch (error) {
                setMessage(message, error.message || "Unable to save the event.", "error");
            }
        });
    }

    if (announcementForm) {
        announcementForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(announcementForm);
            const file = document.getElementById("announcementFile").files[0];
            const message = document.getElementById("announcementFormMessage");

            if (!file) {
                setMessage(message, "Please upload the announcement PDF or image.", "error");
                return;
            }

            try {
                const fileData = await readFileAsDataUrl(file);
                const today = window.JCSContentStore.formatDisplayDate(new Date());

                window.JCSContentStore.saveAnnouncement({
                    title: formData.get("announcementTitle"),
                    date: today,
                    eventDate: formatInputDate(formData.get("announcementEventDate")),
                    file: fileData,
                    createdBy: getCurrentAdmin()
                });

                announcementForm.reset();
                clearDraft(DRAFT_KEYS.announcement);
                if (todayField) {
                    todayField.value = today;
                }
                setMessage(message, "Announcement saved and added to the announcements page.", "success");
                refreshAdminLists();
            } catch (error) {
                setMessage(message, error.message || "Unable to save the announcement.", "error");
            }
        });
    }
});
