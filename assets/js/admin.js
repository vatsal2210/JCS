function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error(`Unable to read file: ${file.name}`));
        reader.readAsDataURL(file);
    });
}

const DRAFT_KEYS = {
    event: "jcs_admin_event_draft",
    announcement: "jcs_admin_announcement_draft"
};

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
            </div>
            <button type="button" class="btn btn-outline-danger btn-sm" data-delete-announcement="${announcement.id}">Delete</button>
        </div>
    `).join("");
}

function refreshAdminLists() {
    renderSavedEvents();
    renderSavedAnnouncements();
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
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = window.JCSContentStore.getCurrentUser();
    toggleAdminView(Boolean(currentUser), currentUser);
    refreshAdminLists();

    const todayField = document.getElementById("announcementDate");
    if (todayField) {
        todayField.value = window.JCSContentStore.formatDisplayDate(new Date());
    }

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const eventForm = document.getElementById("eventAdminForm");
    const announcementForm = document.getElementById("announcementAdminForm");
    const logoutButton = document.getElementById("adminLogoutButton");

    restoreFormFields(eventForm, readDraft(DRAFT_KEYS.event));
    restoreFormFields(announcementForm, readDraft(DRAFT_KEYS.announcement));

    if (todayField && !todayField.value) {
        todayField.value = window.JCSContentStore.formatDisplayDate(new Date());
    }

    watchDraftFields(eventForm, DRAFT_KEYS.event);
    watchDraftFields(announcementForm, DRAFT_KEYS.announcement);

    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(signupForm);
            const message = document.getElementById("signupMessage");

            try {
                const user = window.JCSContentStore.signupUser({
                    name: formData.get("signupName"),
                    email: formData.get("signupEmail"),
                    password: formData.get("signupPassword")
                });
                signupForm.reset();
                toggleAdminView(true, user);
                setMessage(message, "Account created successfully.", "success");
            } catch (error) {
                setMessage(message, error.message, "error");
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const message = document.getElementById("loginMessage");

            try {
                const user = window.JCSContentStore.loginUser(
                    formData.get("loginEmail"),
                    formData.get("loginPassword")
                );
                loginForm.reset();
                toggleAdminView(true, user);
                setMessage(message, "Login successful.", "success");
            } catch (error) {
                setMessage(message, error.message, "error");
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            window.JCSContentStore.logoutUser();
            toggleAdminView(false, null);
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
                    images
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
                    file: fileData
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
