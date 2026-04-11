window.JCSContentStore = (function () {
    const KEYS = {
        adminSession: "jcs_admin_session",
        adminEvents: "jcs_admin_events",
        adminAnnouncements: "jcs_admin_announcements",
        siteSettings: "jcs_site_settings"
    };

    function readJson(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            console.error(`Unable to read localStorage key: ${key}`, error);
            return fallback;
        }
    }

    function writeJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function normalizeKey(value) {
        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function formatDisplayDate(value) {
        const date = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric"
        }).format(date);
    }

    function toParagraphs(text) {
        return String(text || "")
            .split(/\n\s*\n/)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    function getStoredEvents() {
        const events = readJson(KEYS.adminEvents, []);
        return Array.isArray(events)
            ? events.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            : [];
    }

    function saveEvent(input) {
        const events = getStoredEvents();
        const id = normalizeKey(input.id || input.title);
        const event = {
            id,
            title: String(input.title || "").trim(),
            shortDescription: String(input.shortDescription || "").trim(),
            images: Array.isArray(input.images) ? input.images : [],
            detailPage: `events/event-detail.html?id=${encodeURIComponent(id)}`,
            fullDescription: Array.isArray(input.fullDescription)
                ? input.fullDescription
                : toParagraphs(input.fullDescription),
            createdBy: input.createdBy || null,
            createdAt: input.createdAt || new Date().toISOString(),
            source: "admin"
        };

        const nextEvents = [event].concat(events.filter((item) => item.id !== id));
        writeJson(KEYS.adminEvents, nextEvents);
        return event;
    }

    function deleteEvent(id) {
        const events = getStoredEvents().filter((item) => item.id !== id);
        writeJson(KEYS.adminEvents, events);
    }

    function parseDate(value) {
        if (!value) return new Date(0);
        const cleaned = String(value).trim().replace(/^Sept\b/i, "Sep");
        const parsed = new Date(cleaned);
        return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
    }

    function getStoredAnnouncements() {
        const announcements = readJson(KEYS.adminAnnouncements, []);
        return Array.isArray(announcements)
            ? announcements.sort((a, b) => parseDate(b.date || b.announcementDate) - parseDate(a.date || a.announcementDate))
            : [];
    }

    function saveAnnouncement(input) {
        const announcements = getStoredAnnouncements();
        const id = normalizeKey(input.id || input.title);
        const announcement = {
            id,
            title: String(input.title || "").trim(),
            date: String(input.date || formatDisplayDate(new Date())).trim(),
            announcementDate: String(input.date || formatDisplayDate(new Date())).trim(),
            eventDate: String(input.eventDate || "").trim(),
            file: String(input.file || "").trim(),
            createdBy: input.createdBy || null,
            createdAt: input.createdAt || new Date().toISOString(),
            source: "admin"
        };

        const nextAnnouncements = [announcement].concat(announcements.filter((item) => item.id !== id));
        writeJson(KEYS.adminAnnouncements, nextAnnouncements);
        return announcement;
    }

    function deleteAnnouncement(id) {
        const announcements = getStoredAnnouncements().filter((item) => item.id !== id);
        writeJson(KEYS.adminAnnouncements, announcements);
    }

    function getCurrentUser() {
        return readJson(KEYS.adminSession, null);
    }

    function setCurrentUser(user) {
        writeJson(KEYS.adminSession, user || null);
    }

    function logoutUser() {
        localStorage.removeItem(KEYS.adminSession);
    }

    function getSiteSettings() {
        const defaults = {
            adminPageVisible: false
        };
        const saved = readJson(KEYS.siteSettings, defaults);
        return {
            ...defaults,
            ...(saved || {})
        };
    }

    function updateSiteSettings(nextSettings) {
        const merged = {
            ...getSiteSettings(),
            ...(nextSettings || {})
        };
        writeJson(KEYS.siteSettings, merged);
        return merged;
    }

    return {
        formatDisplayDate,
        normalizeKey,
        toParagraphs,
        getStoredEvents,
        saveEvent,
        deleteEvent,
        getStoredAnnouncements,
        saveAnnouncement,
        deleteAnnouncement,
        setCurrentUser,
        getCurrentUser,
        logoutUser,
        getSiteSettings,
        updateSiteSettings
    };
})();
