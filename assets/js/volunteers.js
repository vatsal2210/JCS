// Volunteers rendering from JSON
let volunteersData = null;

// Load volunteers data from JSON file
async function loadVolunteersData() {
    try {
        // Determine the correct path based on current page location
        let jsonPath = 'assets/js/volunteers.json';
        if (window.location.pathname.includes('/events/')) {
            jsonPath = '../assets/js/volunteers.json';
        }
        const response = await fetch(jsonPath);
        volunteersData = await response.json();
        return volunteersData;
    } catch (error) {
        console.error('Error loading volunteers data:', error);
        return null;
    }
}

// Render volunteers on the page
function renderVolunteers(volunteers, containerId = 'volunteersContainer') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Volunteers container not found');
        return;
    }

    container.innerHTML = '';

    volunteers.forEach((volunteer) => {
        const listItem = createVolunteerItem(volunteer);
        container.appendChild(listItem);
    });
}

// Create volunteer list item HTML
function createVolunteerItem(volunteer) {
    const li = document.createElement('li');
    li.className = 'mb-2';

    if (volunteer.linkedin) {
        li.innerHTML = `
            <a href="${volunteer.linkedin}" target="_blank">${volunteer.name}</a>
        `;
    } else {
        li.innerHTML = `
            ${volunteer.name}
        `;
    }

    return li;
}

// Initialize volunteers on page load
document.addEventListener('DOMContentLoaded', async function() {
    const volunteersContainer = document.getElementById('volunteersContainer');
    if (volunteersContainer) {
        const data = await loadVolunteersData();
        if (data) {
            renderVolunteers(data.volunteers, 'volunteersContainer');
        }
    }
});

