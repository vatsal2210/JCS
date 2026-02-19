// Leadership rendering from JSON
let leadershipData = null;

// Load leadership data from JSON file
async function loadLeadershipData() {
    try {
        // Determine the correct path based on current page location
        let jsonPath = 'assets/js/leadership.json';
        if (window.location.pathname.includes('/events/')) {
            jsonPath = '../assets/js/leadership.json';
        }
        const response = await fetch(jsonPath);
        leadershipData = await response.json();
        return leadershipData;
    } catch (error) {
        console.error('Error loading leadership data:', error);
        return null;
    }
}

// Render leadership on the page
function renderLeadership(leadership, containerId = 'leadershipContainer') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Leadership container not found');
        return;
    }

    container.innerHTML = '';

    leadership.forEach((member) => {
        const listItem = createLeadershipItem(member);
        container.appendChild(listItem);
    });
}

// Create leadership list item HTML
function createLeadershipItem(member) {
    const li = document.createElement('li');
    li.className = 'mb-2';

    if (member.linkedin) {
        li.innerHTML = `
            <a href="${member.linkedin}" target="_blank">${member.name}</a>, ${member.title}
        `;
    } else {
        li.innerHTML = `
            ${member.name}, ${member.title}
        `;
    }

    return li;
}

// Initialize leadership on page load
document.addEventListener('DOMContentLoaded', async function() {
    const leadershipContainer = document.getElementById('leadershipContainer');
    if (leadershipContainer) {
        const data = await loadLeadershipData();
        if (data) {
            renderLeadership(data.leadership, 'leadershipContainer');
        }
    }
});

