const announcements = [
    {
        id: "oral-health",
        title: "Health Series Part 2: Oral Health Awareness and Resources",
        date: "February 24, 2026",
        eventDate: "April 25, 2026",
        file: "assets/announcements_images/Part2_Oral_Health.jpeg",
    },
    {
        id: "medical-science",
        title: "A journey into the world of medical science",
        date: "February 19, 2026",
        eventDate: "March 28, 2026",
        file: "assets/announcements_images/Medical_Science.jpeg",
    },
    {
        id: "fire-safety-event",
        title: "Fire Safety",
        date: "February 19, 2026",
        eventDate: "March 14, 2026",
        file: "assets/announcements_images/Fire_Safety.jpeg",
    },
    {
        id: "health-workshop",
        title: "Health Series Part 1: Importance of regular Health Checkup Series",
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
        title: "Tapasvi Celebration",
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
        title: "Accommodation Messages on WhatsApp",
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
        title: "Announcement of Leadership Formalization",
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
          <tr>
            <td class="text-nowrap">${a.announcementDate || a.date || '-'}</td>
            <td class="text-nowrap">${a.eventDate || '-'}</td>
            <td>
                <a href="${link}" ${click} 
                   class="text-decoration-none announcement-title">
                   ${a.title}
                </a>
            </td>
          </tr>
        `;
        })
        .join('');
}

function openAnnouncementModal(filePath, title) {

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
    renderAnnouncementTable(); // new table list
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