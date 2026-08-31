// Each announcement supports either a single poster (`file`) or several
// images/PDFs (`files`), which open in the same carousel used by the events
// section. Example:
//
//   {
//       id: "example-event",
//       title: "Example Event",
//       date: "August 01, 2026",
//       eventDate: "September 01, 2026",
//       files: [
//           { src: "assets/announcements_images/example/image1.jpeg", alt: "Example Event" },
//           { src: "assets/announcements_images/example/image2.jpeg", alt: "Example Event" }
//       ],
//   }
//
const announcements = [
    {
        id: "summer-picnic-2026",
        title: "JCS Canada Summer Picnic - Bringing our Community Together",
        date: "July 14, 2026",
        eventDate: "July 26, 2026",
        files: [
            { src: "assets/announcements_images/SummerPicnic_2026.jpeg", alt: "JCS Canada Summer Picnic" },
            { src: "assets/announcements_images/smallbusinessowner.jpeg", alt: "JCS Canada Summer Picnic" }
        ],
    },{
        id:"one-stage-many-paths",
        title:"One Stage, Many Paths - A cross-disciplinary conversation on careers, growth, and navigating your next move.",
        date:"May 04, 2026",
        eventDate:"May 23, 2026",
        file:"assets/announcements_images/one-stage-many-paths.jpeg",
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

// Announcements can carry either a single `file` (legacy) or a `files` array
// with multiple images/PDFs. Both are normalized to the same media list so the
// modal can show the exact carousel used on the event pages.
function normalizeAnnouncementPath(src) {
    return String(src || "").trim().replace(/^\.\//, "");
}

function getAnnouncementMedia(announcement) {
    if (!announcement) return [];

    const rawList = Array.isArray(announcement.files) && announcement.files.length
        ? announcement.files
        : (announcement.file ? [announcement.file] : []);

    return rawList
        .map((item) => {
            const src = normalizeAnnouncementPath(typeof item === "string" ? item : (item && item.src));
            if (!src) return null;
            const alt = (item && typeof item === "object" && item.alt) || announcement.title || "Announcement";
            return { src, alt };
        })
        .filter(Boolean);
}

function findAnnouncementById(id) {
    if (!id) return null;
    return announcements.find((announcement) => announcement && announcement.id === id) || null;
}

function escapeAnnouncementHtml(value) {
    return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function isPdfPath(src) {
    return String(src || "").toLowerCase().split("?")[0].endsWith(".pdf");
}

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
            ${getAnnouncementMedia(announcement).length ? `<button type="button" class="announcement-notice-btn" onclick="openAnnouncementById('${announcement.id}')">View</button>` : ""}
        </div>
    `;
}

function ensureAnnouncementModal() {
    let modalEl = document.getElementById("announcementModal");
    if (modalEl) {
        // Pages may still ship the older single-image/PDF modal body; upgrade it
        // in place so every announcement renders through the carousel.
        const existingBody = modalEl.querySelector(".modal-body");
        if (existingBody && !existingBody.querySelector("#announcementModalMedia")) {
            existingBody.classList.add("announcement-modal-body");
            existingBody.removeAttribute("style");
            existingBody.innerHTML = '<div id="announcementModalMedia" class="announcement-modal-media"></div>';
        }
        return modalEl;
    }

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
                <div class="modal-body announcement-modal-body text-center">
                    <div id="announcementModalMedia" class="announcement-modal-media"></div>
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
    const hasMedia = getAnnouncementMedia(nextEvent.announcement).length > 0;
    link.href = hasMedia ? "#" : "announcements.html";
    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.dataset.announcementId = hasMedia ? (nextEvent.announcement.id || "") : "";
    link.dataset.title = nextEvent.announcement.title || "";
    link.dataset.fallback = "announcements.html";

    if (!link.dataset.bound) {
        link.addEventListener("click", (event) => {
            const currentId = link.dataset.announcementId || "";
            if (currentId) {
                event.preventDefault();
                openAnnouncementById(currentId);
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
            const media = getAnnouncementMedia(a);
            const link = media.length ? '#' : `?id=${a.id}`;
            const click = media.length ? `onclick="openAnnouncementById('${a.id}')"` : '';
            const galleryChip = media.length > 1
                ? `<span class="announcement-media-count" title="${media.length} images">
                       <i class="bi bi-images" aria-hidden="true"></i> ${media.length}
                   </span>`
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
                   ${galleryChip}
                   <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                </a>
            </td>
          </tr>
        `;
        })
        .join('');
}

// Builds the same Bootstrap carousel markup used on the event detail pages so
// announcements with several images look and behave identically.
function buildAnnouncementCarousel(mediaList) {
    const carouselId = "announcementDetailCarousel";
    const hasMultiple = mediaList.length > 1;

    const indicators = mediaList.map((media, index) => `
        <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}"
            class="${index === 0 ? "active" : ""}"
            aria-current="${index === 0 ? "true" : "false"}"
            aria-label="${escapeAnnouncementHtml(media.alt)}"></button>
    `).join("");

    const items = mediaList.map((media, index) => {
        const src = escapeAnnouncementHtml(media.src);
        const alt = escapeAnnouncementHtml(media.alt);
        const mediaMarkup = isPdfPath(media.src)
            ? `<iframe src="${src}" class="announcement-carousel-pdf" title="${alt}" frameborder="0"></iframe>`
            : `<img src="${src}" class="d-block rounded announcement-carousel-image" alt="${alt}" />`;

        return `<div class="carousel-item ${index === 0 ? "active" : ""}">${mediaMarkup}</div>`;
    }).join("");

    return `
        <div id="${carouselId}" class="carousel slide jcs-carousel announcement-carousel"
            data-bs-ride="${hasMultiple ? "carousel" : "false"}" data-bs-interval="6000" data-bs-pause="hover">
            ${hasMultiple ? `<div class="carousel-indicators">${indicators}</div>` : ""}
            <div class="carousel-inner">
                ${items}
            </div>
            ${hasMultiple ? `
            <button class="carousel-control-prev" type="button"
                data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button"
                data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            ` : ""}
        </div>
    `;
}

function showAnnouncementModal(mediaList, title) {
    if (!mediaList || !mediaList.length) return;

    ensureAnnouncementModal();

    const titleEl = document.getElementById("announcementModalTitle");
    if (titleEl) {
        titleEl.textContent = title || "";
    }

    const mediaContainer = document.getElementById("announcementModalMedia");
    if (mediaContainer) {
        mediaContainer.innerHTML = buildAnnouncementCarousel(mediaList);

        // Markup injected after page load is not picked up by Bootstrap's auto
        // init, so start the slideshow manually when there are several images.
        const carouselEl = mediaContainer.querySelector(".announcement-carousel");
        if (carouselEl && mediaList.length > 1 && window.bootstrap && bootstrap.Carousel) {
            bootstrap.Carousel.getOrCreateInstance(carouselEl, {
                interval: 6000,
                ride: "carousel",
                pause: "hover"
            });
        }
    }

    const modalEl = document.getElementById("announcementModal");
    if (!modalEl.dataset.cleanupBound) {
        modalEl.addEventListener("hidden.bs.modal", () => {
            const openCarousel = modalEl.querySelector(".announcement-carousel");
            if (openCarousel && window.bootstrap && bootstrap.Carousel) {
                const instance = bootstrap.Carousel.getInstance(openCarousel);
                if (instance) instance.dispose();
            }
            const container = document.getElementById("announcementModalMedia");
            if (container) container.innerHTML = "";
        });
        modalEl.dataset.cleanupBound = "true";
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
}

// Preferred entry point: everything about the announcement (including all of
// its images) is looked up from the announcements list by id.
function openAnnouncementById(announcementId) {
    const announcement = findAnnouncementById(announcementId);
    if (!announcement) return;

    showAnnouncementModal(getAnnouncementMedia(announcement), announcement.title);
}

// Kept for backward compatibility with any existing single-file callers.
function openAnnouncementModal(filePath, title) {
    const src = normalizeAnnouncementPath(filePath);
    if (!src) return;

    showAnnouncementModal([{ src, alt: title || "Announcement" }], title);
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
