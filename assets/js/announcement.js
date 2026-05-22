const announcements = [
    {
        id:"one-stage-many-paths",
        title:"One Stage, Many Paths - A cross….move",
        date:"May 04, 2026",
        eventDate:"May 23, 2026",
        file:"assets/announcements_images/One_Stage_Many_Paths.jpeg",
    },{
        id: "Health-&-Wellness-Series-part-2",
        title: "Health & Wellness Series Part 2: Oral Health Awareness and Resources",
        date: "February 24, 2026",
        eventDate: "April 25, 2026",
        file: "assets/announcements_images/Part2_Oral_Health.jpeg",
    },
    {
        id: "medical-science",
        title: "Workshop for Grade 5-8 students: A journey into the world of medical science",
        date: "February 19, 2026",
        eventDate: "March 28, 2026",
        file: "assets/announcements_images/Medical_Science.jpeg",
    },
    {
        id: "fire-safety-event",
        title: "Fire Safety: Prevention, Detection and Escape - For Ontario residents",
        date: "February 19, 2026",
        eventDate: "March 14, 2026",
        file: "assets/announcements_images/Fire_Safety.jpeg",
    },
    {
        id: "health-&-wellness-series-part-1",
        title: "Health & Wellness Series Part 1: Importance of regular Health Checkup",
        date: "January 21, 2026",
        eventDate: "February 21, 2026",
        file: "assets/announcements_images/Part1_Health_Checkup.jpeg",
    },
    {
        id: "diwali-event",
        title: "Diwali Celebration",
        date: "September 26, 2025",
        eventDate: "October 26, 2025",
        file: "./assets/announcements_images/Sept 26, 2025 - Diwali_Event_Website_Temp.png",
    },
    {
        id: "tapasvi-event",
        title: "Tapasvi celebration and sharing best practices",
        date: "August 12, 2025",
        eventDate: "September 12, 2025",
        file: "./assets/announcements_images/tapasvi_.jpeg",
    },
    {
        id: "picnic-play-event",
        title: "Picnic & Play",
        date: "May 22, 2025",
        eventDate: "June 22, 2025",
        file: "./assets/announcements_images/May 22, 2025 - Picnic_Event_Website_Temp.png",
    },
    ,{
        id: "career-guidance-mentorship",
        title: "Career Guidance & Mentorship",
        date: "April 05, 2025",
        eventDate: "May 03, 2025",
        file: "./assets/announcements_images/JainEvent.pdf",
    },
    {
        id: "accommodation-guidelines",
        title: "Accommodation messages on JCS Community WhatsApp groups",
        date: "March 06, 2025",
        eventDate: "April 05, 2025",
        file: "./assets/announcements_images/Accomodation_related_messages.pdf",
    },
    {
        id: "business-promotions",
        title: "Weekend Jain Business Promotions Allowed!",
        date: "March 05, 2025",
        eventDate: "April 05, 2025",
        file:"./assets/announcements_images/April 05, 2025 - Weekend Jain Business Promotion.pdf"
    },
    {
        id: "virtual-wellness-workshop",
        title: "Virtual Wellness Workshop – The Blood Sugar Blueprint",
        date: "January 10, 2025",
        eventDate: "February 01, 2025",
        file:"./assets/announcements_images/Jan 10, 2025 - Virtual Wellness Workshop - The Blood Sugar Blueprint.jpg",
    },
    {
        id: "leadership-formalization",
        title: "Announcement of JCS Canada Leadership Formalization",
        date: "September 30, 2024",
        eventDate: "October 31, 2024",
        file:"./assets/announcements_images/Oct 31, 2024 - Leadership formalization.pdf",
    },
    {
        id: "meet-and-greet-immigrants",
        title: "Meet and Greet for New Immigrants & Students",
        date: "September 24, 2019",
        eventDate: "October 20, 2019",
        file:"./assets/announcements_images/Sep 24, 2019 - Meet and Greet New immigrants and students event.pdf",
    },
];

function parseAnnouncementDate(value) {
    if (!value) return null;

    const cleaned = String(value).trim().replace(/^Sept\b/i, "Sep");
    const timestamp = Date.parse(cleaned);
    if (!Number.isNaN(timestamp)) {
        return new Date(timestamp);
    }

    return null;
}

function getEventExpiryDate(eventDate) {
    if (!eventDate) return null;
    // Keep visible through the full day after event date.
    const expiry = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate() + 2);
    return expiry;
}

function getNextEventAnnouncement(now = new Date()) {
    const activeEvents = announcements
        .filter((announcement) => announcement && announcement.eventDate)
        .map((announcement) => {
            const eventDate = parseAnnouncementDate(announcement.eventDate);
            const expiryDate = getEventExpiryDate(eventDate);
            return {
                announcement,
                eventDate,
                expiryDate
            };
        })
        .filter((item) => item.eventDate && item.expiryDate && now < item.expiryDate)
        .sort((a, b) => a.eventDate - b.eventDate);

    return activeEvents.length ? activeEvents[0] : null;
}

function renderNextEventNotification() {
    const notice = document.getElementById("nextEventNotification");
    const noticeWrap = document.getElementById("nextEventNotificationWrap");
    if (!notice) return;

    const nextEvent = getNextEventAnnouncement(new Date());
    if (!nextEvent) {
        notice.classList.add("d-none");
        notice.innerHTML = "";
        if (noticeWrap) noticeWrap.classList.add("d-none");
        return;
    }

    if (noticeWrap) noticeWrap.classList.remove("d-none");
    const { announcement, eventDate } = nextEvent;
    notice.classList.remove("d-none");
    notice.innerHTML = `
        <div class="announcement-notice-content">
            <span class="announcement-notice-tag">Next Event</span>
            <div class="announcement-notice-body">
                <strong>${announcement.title}</strong>
                <span>Event Date: ${announcement.eventDate}</span>
            </div>
            ${announcement.file ? `<button type="button" class="announcement-notice-btn" onclick="openAnnouncementModal('${announcement.file}', '${announcement.title.replace(/'/g, "\\'")}')">View</button>` : ""}
        </div>
    `;
}

function ensureAnnouncementModal() {
    let modalEl = document.getElementById("announcementModal");
    if (modalEl) return modalEl;

    modalEl = document.createElement("div");
    modalEl.className = "modal fade";
    modalEl.id = "announcementModal";
    modalEl.tabIndex = -1;
    modalEl.setAttribute("aria-hidden", "true");
    modalEl.innerHTML = `
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="announcementModalTitle"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center" style="height: 80vh;">
                    <img id="modal-image" class="img-fluid d-none" style="max-height: 100%;">
                    <iframe id="modal-pdf" class="w-100 h-100 d-none" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalEl);
    return modalEl;
}

function getDismissedEventKey() {
    try {
        return localStorage.getItem("jcs_home_top_alert_dismissed_key") || "";
    } catch (error) {
        return "";
    }
}

function setDismissedEventKey(key) {
    try {
        localStorage.setItem("jcs_home_top_alert_dismissed_key", key);
    } catch (error) {
        // Ignore storage issues (private mode, etc.)
    }
}

function hideHomeTopAlert() {
    const bar = document.getElementById("homeTopAlert");
    if (!bar) return;
    bar.classList.add("d-none");
    document.body.classList.remove("has-top-alert");
}

function renderHomeTopAlert() {
    const bar = document.getElementById("homeTopAlert");
    const text = document.getElementById("homeTopAlertText");
    const link = document.getElementById("homeTopAlertLink");
    const closeBtn = document.getElementById("homeTopAlertClose");
    if (!bar || !text || !link || !closeBtn) return;

    const nextEvent = getNextEventAnnouncement(new Date());
    if (!nextEvent) {
        hideHomeTopAlert();
        return;
    }

    const eventKey = `${nextEvent.announcement.id}:${nextEvent.announcement.eventDate}`;
    if (getDismissedEventKey() === eventKey) {
        hideHomeTopAlert();
        return;
    }

    text.innerHTML = `
        <i class="bi bi-stars" aria-hidden="true"></i>
        <span><strong>New Update:</strong> ${nextEvent.announcement.title} (${nextEvent.announcement.eventDate})</span>
    `;
    const filePath = nextEvent.announcement.file ? String(nextEvent.announcement.file).replace(/^\.\//, "") : "";
    link.href = filePath ? "#" : "announcements.html";
    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.dataset.file = filePath;
    link.dataset.title = nextEvent.announcement.title || "";
    link.dataset.fallback = "announcements.html";

    if (!link.dataset.bound) {
        link.addEventListener("click", (event) => {
            const currentFile = link.dataset.file || "";
            const currentTitle = link.dataset.title || "";
            if (currentFile) {
                event.preventDefault();
                openAnnouncementModal(currentFile, currentTitle);
            }
        });
        link.dataset.bound = "true";
    }

    if (!closeBtn.dataset.bound) {
        closeBtn.addEventListener("click", () => {
            setDismissedEventKey(eventKey);
            hideHomeTopAlert();
        });
        closeBtn.dataset.bound = "true";
    }

    bar.classList.remove("d-none");
    document.body.classList.add("has-top-alert");
}

function renderAnnouncementTable() {
    const tableBody = document.querySelector("#announcement-table tbody");
    if (!tableBody || !announcements) return;

    tableBody.innerHTML = announcements
        .map(a => {
            const link = a.file ? '#' : `?id=${a.id}`;

            const click = a.file
                ? `onclick="openAnnouncementModal('${a.file}', '${a.title.replace(/'/g, "\\'")}')"`
                : '';

            return `
          <tr class="announcement-row">
            <td class="text-nowrap">
                <span class="announcement-date-pill">${a.announcementDate || a.date || '-'}</span>
            </td>
            <td class="text-nowrap">
                <span class="announcement-date-pill announcement-date-pill-event">${a.eventDate || '-'}</span>
            </td>
            <td class="announcement-title-cell">
                <a href="${link}" ${click} 
                   class="text-decoration-none announcement-title">
                   <span>${a.title}</span>
                   <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                </a>
            </td>
          </tr>
        `;
        })
        .join('');
}

function openAnnouncementModal(filePath, title) {
    ensureAnnouncementModal();

    const isPDF = filePath.toLowerCase().endsWith('.pdf');
    const img = document.getElementById("modal-image");
    const pdf = document.getElementById("modal-pdf");

    // 🔥 Set Modal Title
    if (title) {
        document.getElementById("announcementModalTitle").textContent = title;
    }

    // Reset
    img.classList.add("d-none");
    pdf.classList.add("d-none");

    if (isPDF) {
        pdf.src = filePath;
        pdf.classList.remove("d-none");
    } else {
        img.src = filePath;
        img.classList.remove("d-none");
    }

    const modal = new bootstrap.Modal(document.getElementById("announcementModal"));
    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    renderHomeTopAlert();
    renderNextEventNotification();
    renderAnnouncementTable(); // new table list
    // Refresh periodically so banner naturally rolls to the next event.
    setInterval(() => {
        renderHomeTopAlert();
        renderNextEventNotification();
    }, 60 * 60 * 1000);
});


// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null ?
        "" :
        decodeURIComponent(results[1].replace(/\+/g, " "));
}
