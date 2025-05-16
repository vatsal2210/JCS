const announcements = [
    {
        id: "career-guidance-mentorship",
        title: "Career Guidance & Mentorship",
        design:"flyer",
        highlights: [
            "Valuable insights for youth career growth",
            "Professional mentors from diverse industries",
            "Focus on giving back to the community",
            "Free admission with refreshments",
            "May 3, 2025 – JSOT Hall, Scarborough"
        ],
        date: "May 3, 2025",
        time: "10:30 AM to 2:00 PM",
        location: "JSOT Hall, 441 Ellesmere Rd, Scarborough, ON M1R 4E5",
        detailContent: `
        <div class="flyer-style">
            <img src="https://jcscanada.org/assets/JCS.png" alt="JCS Logo" width="80" class="mb-3">
            <h4>JAIN COMMUNITY SERVICES OF CANADA</h4>
            <div class="mb-2 fw-semibold">FOUNDED IN 1985</div>
            <h2 class="mb-3">Career Guidance & Mentorship</h2>
            <h6 class="mb-4 text-uppercase">Empowering Community | Honoring Values | Inspiring Futures</h6>
            <p>Join us for an inspiring afternoon focused on <strong>Career Guidance and Mentorship</strong>, where you will gain valuable insights to help shape the future paths — both professionally and personally.</p>
    
                <p>We are <strong>thrilled to welcome an incredible lineup of professionals</strong> from diverse industries who will share their experiences, challenges, and lessons learned along the way.</p>
    
                <p>This event is designed to spark inspiration, encourage meaningful conversations, and help our youth take confident steps in their career journeys — all while reflecting on the <strong>importance of giving back to the community</strong>.</p>
    
                <hr class="my-4" />
    
                <ul style="list-style: none; padding-left: 0; font-size: 1rem;">
                    <li><strong>Date:</strong> Saturday, May 3, 2025</li>
                    <li><strong>Time:</strong> 10:30 AM to 2:00 PM</li>
                    <li><strong>Location:</strong> Jain Society of Toronto, Moti Champsee Cultural Centre, JSOT Hall, 441 Ellesmere Rd, Scarborough, ON M1R 4E5</li>
                    <li><strong>Admission:</strong> Free | Limited Spots – RSVP Today!</li>
                    <li><strong>Refreshments:</strong> Light refreshments provided</li>
                </ul>
    
                <div class="text-center mt-4 fw-bold" style="font-size: 1rem;">
                    Hosted by Jain Community Services of Canada (Founded in 1985)
                </div>
            </div>
            </div>
        `
    },{
        id: "accommodation-guidelines",
        title: "Accommodation Messages on WhatsApp",
        highlights: [
          "Post only if it's your own or you're residing there",
          "Shared residents must be pure vegetarian",
          "Mention area, name, phone number",
          "Include up to 2 photos per post",
          "JCS is not liable — use lease agreements"
        ],
        date: "April 05, 2025",
        time: "All Day",
        location: "JCS Community WhatsApp Groups",
        detailContent: `
          <div class="accommodation-style mt-3">
            
            <p>As part of our effort to support the community and streamline accommodation-related communication, please note the following guidelines for posting any accommodation-related messages on the Community WhatsApp Groups:</p>
      
            <ul style="line-height: 1.8; padding-left: 1.2rem;">
              <li>The property must be your own or you must be currently residing there.</li>
              <li>For shared accommodations, all other residents must be pure vegetarian.</li>
              <li>Include your area (major intersection) clearly.</li>
              <li>Mention your full name and phone number.</li>
              <li>You may attach up to 2 photos per message.</li>
            </ul>
      
            <h6 class="mt-4" style="font-weight: bold;">Disclaimer</h6>
            <p style="font-size: 0.95rem;">
              Jain Community Services of Canada (JCS Canada) only facilitates the sharing of housing-related messages within the community and does not take any responsibility for the actions, conduct, or agreements made by landlords, tenants, or other parties involved.
            </p>
            <p style="font-size: 0.95rem;">
              We strongly recommend that tenants enter into a formal lease agreement with the landlord to protect their rights and responsibilities.
            </p>
          </div>
        `
      },{
        id: "business-promotions",
        title: "Weekend Jain Business Promotions Allowed!",
        highlights: [
          "Promote your business every Saturday and Sunday",
          "No admin approval needed",
          "Business must be online or within Canada",
          "Include intersection, discounts, and your contact info",
          "Attach up to 2 photos per post"
        ],
        date: "April 05, 2025",
        time: "All Day (Weekends)",
        location: "JCS Community WhatsApp Groups",
        detailContent: `
          <div>
      
            <p>We are excited to announce that all Jain business owners in our group can now promote their businesses every Saturday and Sunday without admin approval!</p>
      
            <h6 class="mt-4 fw-bold">Guidelines:</h6>
            <ul style="line-height: 1.8; padding-left: 1.2rem;">
              <li>You must be the owner of the business/service.</li>
              <li>Your business/service should be available online or within Canada.</li>
              <li>If you have a physical location, provide complete details, including the major intersection.</li>
              <li>Mention any special discounts for our community members.</li>
              <li>You may attach up to 2 photos per post.</li>
              <li>Write your name and phone number at the end of every post.</li>
            </ul>
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
                    <a href="./announcements/announcements.html?id=${a.id}" class="btn btn-primary mt-auto w-100">More Details</a>
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
                <p><strong>Let's support each other and help local Jain Community grow!</strong></p>
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
    if (announcement.design === 'flyer') {
        document.getElementById('announcement-title').style.display = 'none';
        document.getElementById('announcement-founded').style.display = 'none';
        document.getElementById('announcement-date').style.display = 'none';
        document.getElementById('announcement-header').style.display = 'none';
        document.getElementById('announcement-wrapper').classList.remove('card', 'shadow-lg');
        document.getElementById('announcement-wrapper').classList.add('p-0'); // or your preferred spacing
        document.getElementById('announcement-content').innerHTML = announcement.detailContent;
    } else {
        document.getElementById('announcement-title').textContent = announcementData.title;
        document.getElementById('announcement-founded').textContent = announcementData.founded;
        document.getElementById('announcement-date').textContent = announcementData.date;
        document.getElementById('announcement-content').innerHTML = announcementData.content;
        document.getElementById('announcement-container').classList.add('mt-5','mb-5');
    }
    
}
