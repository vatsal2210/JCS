const announcements = [{
        id: "career-guidance-mentorship",
        title: "Career Guidance & Mentorship",
        date: "May 3, 2025",
        file: "./assets/announcements_images/JainEvent.pdf",
    },
    {
        id: "accommodation-guidelines",
        title: "Accommodation Messages on WhatsApp",
        date: "April 05, 2025",
        file: "./assets/announcements_images/Accomodation_related_messages.pdf",
    },
    {
        id: "business-promotions",
        title: "Weekend Jain Business Promotions Allowed!",
        date: "April 05, 2025",
        file:"./assets/announcements_images/April 05, 2025 - Weekend Jain Business Promotion.pdf"
    },
    {
        id: "virtual-wellness-workshop",
        title: "Virtual Wellness Workshop – The Blood Sugar Blueprint",
        date: "February 1, 2025",
        file:"./assets/announcements_images/Jan 10, 2025 - Virtual Wellness Workshop - The Blood Sugar Blueprint.jpg",
    },
    {
        id: "leadership-formalization",
        title: "Announcement of Leadership Formalization",
        date: "October 31, 2024",
        file:"./assets/announcements_images/Oct 31, 2024 - Leadership formalization.pdf",
    },
    {
        id: "meet-and-greet-immigrants",
        title: "Meet and Greet for New Immigrants & Students",
        date: "October 20, 2019",
        file:"./assets/announcements_images/Sep 24, 2019 - Meet and Greet New immigrants and students event.pdf",
    },
];

function renderAnnouncementTable() {
    const tableBody = document.querySelector("#announcement-table tbody");
    if (!tableBody || !announcements) return;

    tableBody.innerHTML = announcements
        .map(a => {
            const link = a.file ? '#' : `?id=${a.id}`;
            const click = a.file ? `onclick="openAnnouncementModal('${a.file}')"` : '';
            return `
          <tr>
            
            <td class="ps-5">${a.date}</td>
            <td><a href="${link}" ${click} class="text-decoration-none">${a.title}</a></td>
          </tr>
        `;
        })
        .join('');
}

function openAnnouncementModal(filePath) {
    const isPDF = filePath.toLowerCase().endsWith('.pdf');
    const img = document.getElementById("modal-image");
    const pdf = document.getElementById("modal-pdf");

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