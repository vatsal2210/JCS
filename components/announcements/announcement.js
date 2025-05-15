const announcements = [
    {
        id: "accommodation-guidelines",
        title: "Accommodation Guidelines for WhatsApp Groups",
        highlights: [
            "Property must be your own or you must reside there",
            "All shared residents must be pure vegetarian",
            "Include area, full name, phone, up to 2 photos"
        ],
        date: "April 05, 2025",
        time: "All Day",
        location: "JCS Community WhatsApp Groups",
        detailContent: `
            <p>As part of our effort to support the community and streamline accommodation related communication, please note the following <strong>guidelines</strong> for posting any accommodation-related messages on the Community WhatsApp Groups:</p>
            <ul>
                <li>The property must be your own or you must be currently residing there.</li>
                <li>For shared accommodations, all other residents must be pure vegetarian.</li>
                <li>Include your area (major intersection) clearly.</li>
                <li>Mention your full name and phone number.</li>
                <li>You may attach up to 2 photos per message.</li>
            </ul>
            <div class="mt-4"><strong><em>Disclaimer</em></strong></div>
            <p class="mb-2">Jain Community Services of Canada (JCS Canada) only facilitates the sharing of housing related messages within the community and does not take any responsibility for the actions, conduct, or agreements made by landlords, tenants, or other parties involved. We strongly recommend that tenants enter into a formal lease agreement with the landlord to protect their rights and responsibilities.</p>
            <p class="fw-bold">Let's support each other and help local Jain Community grow!</p>
        `
    },
    {
        id: "business-promotions",
        title: "Weekend Jain Business Promotions Allowed!",
        highlights: [
            "You must be the owner of the business/service.",
            "Your business/service should be available online or within Canada.",
            "If you have a physical location, provide complete details, including the major intersection.",
            "Mention any special discounts for our community members.",
            "You may attach up to 2 photos per post.",
            "Write your name and phone number at the end of every post."
        ],
        date: "April 05, 2025",
        time: "All Day (Weekends)",
        location: "JCS Community WhatsApp Groups",
        detailContent: `
            <p>We are excited to announce that all Jain business owners in our group can now promote their businesses every Saturday and Sunday without admin approval!</p>
            <b>Guidelines:</b>
            <ul>
                <li>You must be the owner of the business/service.</li>
                <li>Your business/service should be available online or within Canada.</li>
                <li>If you have a physical location, provide complete details, including the major intersection.</li>
                <li>Mention any special discounts for our community members.</li>
                <li>You may attach up to 2 photos per post.</li>
                <li>Write your name and phone number at the end of every post.</li>
            </ul>
            <p class="fw-bold">Let's support each other and help local Jain businesses grow!</p>
        `
    },{
        id: "career-guidance-mentorship",
        title: "Career Guidance & Mentorship",
        highlights: [
            "Inspiring afternoon focused on career and mentorship",
            "Speakers from diverse professional backgrounds",
            "Insights on career steps, challenges, and lessons",
            "Encourages community support and giving back",
            "Free admission with light refreshments"
        ],
        date: "May 3, 2025",
        time: "10:30 AM to 2:00 PM",
        location: "Jain Society of Toronto, JSOT Hall, 441 Ellesmere Rd, Scarborough, ON M1R 4E5",
        detailContent: `
            <h3 class="text-center mb-4 fw-bold">Career Guidance & Mentorship</h3>
            <h5 class="text-center mb-3 text-uppercase fw-semibold">Empowering Community | Honoring Values | Inspiring Futures</h5>
    
            <p>Join us for an inspiring afternoon focused on <strong>Career Guidance and Mentorship</strong>, where you will gain valuable insights to help shape the future paths — both professionally and personally.</p>
    
            <p>We are <strong>thrilled to welcome an incredible lineup of professionals</strong> from diverse industries who will share their experiences, challenges, and lessons learned along the way.</p>
    
            <p>This event is designed to spark inspiration, encourage meaningful conversations, and help our youth take confident steps in their career journeys — all while reflecting on the <strong>importance of giving back to the community</strong>.</p>
    
            <div class="mt-4">
                <p><strong>Date:</strong> Saturday, May 3, 2025</p>
                <p><strong>Time:</strong> 10:30 AM to 2:00 PM</p>
                <p><strong>Location:</strong> Jain Society of Toronto, Moti Champsee Cultural Centre, JSOT Hall, 441 Ellesmere Rd, Scarborough, ON M1R 4E5</p>
                <p><strong>Admission:</strong> Free | Limited Spots – RSVP Today!</p>
                <p><strong>Light refreshments provided</strong></p>
            </div>
    
            <div class="mt-4 fw-bold">
                Hosted by Jain Community Services of Canada (Founded in 1985)
            </div>
        `
    }
];

function renderAnnouncements() {
    const container = document.getElementById('announcements-list');
    if (!container) return;
    container.innerHTML = announcements.map(a => `
        <div class="col">
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${a.title}</h5>
                    <ul class="card-text">
                        ${a.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                    <p class="mb-1"><strong>Date:</strong> ${a.date}</p>
                    <p class="mb-1"><strong>Time:</strong> ${a.time}</p>
                    <p class="mb-2"><strong>Location:</strong> ${a.location}</p>
                    <a href="./components/announcements/announcementDetail.html?id=${a.id}" class="btn btn-primary mt-auto w-100">More Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderAnnouncements);

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to load announcement details
function loadAnnouncementDetail() {
    const announcementId = getUrlParameter('id');
    const announcement = announcements.find(a => a.id === announcementId);
    
    let announcementData;
    if (announcement) {
        announcementData = {
            title: "Jain Community Services of Canada",
            founded: "FOUNDED IN 1985",
            date: `Date: ${announcement.date}`,
            content: `
                <h3 class="text-center mb-4 fw-bold">ANNOUNCEMENT</h3>
                <h4 class="text-center mb-4">${announcement.title}</h4>
                <p>Dear JCS Community Members,</p>
                ${announcement.detailContent}
                <div class="mt-4">
                    <strong>Leadership Team<br>Jain Community Services of Canada (JCS Canada)</strong>
                </div>
            `
        };
    } else {
        announcementData = {
            title: "Jain Community Services of Canada",
            founded: "FOUNDED IN 1985",
            date: "Date: Not Available",
            content: "<p>Announcement not found.</p>"
        };
    }

    // Inject data into the template
    document.getElementById('announcement-title').textContent = announcementData.title;
    document.getElementById('announcement-founded').textContent = announcementData.founded;
    document.getElementById('announcement-date').textContent = announcementData.date;
    document.getElementById('announcement-content').innerHTML = announcementData.content;
}
