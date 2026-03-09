// Events rendering from JSON
let eventsData = null;

// Load events data from JSON file
async function loadEventsData() {
    if (window.JCS_EVENTS_DATA && Array.isArray(window.JCS_EVENTS_DATA.events)) {
        eventsData = window.JCS_EVENTS_DATA;
        return eventsData;
    }

    try {
        // Determine the correct path based on current page location
        let jsonPath = 'assets/js/events.json';
        if (window.location.pathname.includes('/events/')) {
            jsonPath = '../assets/js/events.json';
        }
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`Failed to load events data: ${response.status}`);
        }
        eventsData = await response.json();
        return eventsData;
    } catch (error) {
        console.error('Error loading events data:', error);
        return null;
    }
}

// Render events on the main page
function renderEvents(events, containerId = 'eventsContainer') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Events container not found');
        return;
    }

    container.innerHTML = '';

    if (!events || events.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-light border text-center mb-0">
                    Events will be updated soon. Please check back shortly.
                </div>
            </div>
        `;
        return;
    }

    events.forEach((event, index) => {
        const eventCard = createEventCard(event, index);
        container.appendChild(eventCard);
    });
}

// Create event card HTML
function createEventCard(event, index) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-xl-4 mb-4 d-flex';

    const firstImage = event.images && event.images.length > 0 ? event.images[0] : null;

    col.innerHTML = `
        <div class="card event-card w-100 d-flex flex-column">
            <div class="event-card-media">
                ${firstImage ? `
                <div class="event-image-wrapper">
                    <img src="${firstImage.src}" 
                         class="event-image" 
                         alt="${firstImage.alt || event.title}" />
                </div>
                ` : ''}
                <span class="event-chip">
                    <i class="bi bi-stars"></i> Community Event
                </span>
            </div>
            <div class="card-body event-card-body d-flex flex-column">

                <h4 class="event-title">
                    ${event.title}
                </h4>

                <p class="event-description flex-grow-1">
                    ${event.shortDescription}
                </p>

                <div class="event-card-footer mt-auto">
                    <a href="${event.detailPage || `events/event-detail.html?id=${encodeURIComponent(event.id)}`}" 
                       class="btn event-btn">
                        View Details <i class="bi bi-arrow-right"></i>
                    </a>
                </div>

            </div>
        </div>
    `;


    return col;
}

// Render event detail page
function renderEventDetail(eventId) {
    if (!eventsData) {
        console.error('Events data not loaded');
        return;
    }

    const event = findEventById(eventId);
    if (!event) {
        console.error('Event not found:', eventId);
        const container = document.getElementById('eventDetailContainer');
        if (container) {
            container.innerHTML = `
                <div class="mt-4 mb-3">
                    <div class="card-body event-details-content mt-2 text-center">
                        <h1 class="card-title event-title mb-3">Event not found</h1>
                        <p class="event-description">Please go back and open the event again.</p>
                        <a href="../events.html" class="btn btn-secondary">Back to Events</a>
                    </div>
                </div>
            `;
        }
        return;
    }

    const container = document.getElementById('eventDetailContainer');
    if (!container) {
        console.error('Event detail container not found');
        return;
    }

    // Create carousel indicators
    const indicators = event.images.map((img, imgIndex) => {
        return `
            <button type="button" data-bs-target="#eventDetailCarousel" data-bs-slide-to="${imgIndex}"
                class="${imgIndex === 0 ? 'active' : ''}" 
                aria-current="${imgIndex === 0 ? 'true' : 'false'}" 
                aria-label="${img.alt}"></button>
        `;
    }).join('');

    // Create carousel items
    const carouselItems = event.images.map((img, imgIndex) => {
        return `
            <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                <img src="${img.src.startsWith('assets/') ? '../' + img.src : img.src}" 
                    class="d-block w-100 rounded" alt="${img.alt}" />
            </div>
        `;
    }).join('');

    // Create description paragraphs
    const description = event.fullDescription.map(para => {
        // Check if paragraph contains HTML tags (like <i> or <a>)
        if (para.includes('<') || para.includes('&')) {
            return `<p>${para}</p>`;
        }
        return `<p>${para}</p>`;
    }).join('');

    container.innerHTML = `
        <div class="mt-4 mb-3">
            <div class="card-body event-details-content mt-2">
                <h1 class="card-title event-title mb-3 text-center">${event.title}</h1>
                <div id="eventDetailCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        ${indicators}
                    </div>
                    <div class="carousel-inner">
                        ${carouselItems}
                    </div>
                    <button class="carousel-control-prev" type="button" 
                        data-bs-target="#eventDetailCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" 
                        data-bs-target="#eventDetailCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="card-text event-description">
                    ${description}
                </div>
            </div>
            <div class="modal-footer" style="margin-right: 1em; margin-bottom: 1em;">
                <a href="../events.html">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Back</button>
                </a>
            </div>
        </div>
    `;
}

function normalizeEventKey(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function getDetailPageEventId(detailPage) {
    if (!detailPage || !detailPage.includes('id=')) return '';
    const query = detailPage.split('?')[1] || '';
    const params = new URLSearchParams(query);
    return params.get('id') || '';
}

function findEventById(eventId) {
    if (!eventId || !eventsData || !Array.isArray(eventsData.events)) {
        return null;
    }

    const normalizedEventId = normalizeEventKey(eventId);

    return eventsData.events.find((event) => {
        const candidates = [
            event.id,
            event.title,
            getDetailPageEventId(event.detailPage)
        ];

        return candidates.some((candidate) => normalizeEventKey(candidate) === normalizedEventId);
    }) || null;
}

// Initialize events on page load
document.addEventListener('DOMContentLoaded', async function() {
    // Check if we're on the main page (events section)
    const eventsContainer = document.getElementById('eventsContainer');
    if (eventsContainer) {
        const data = await loadEventsData();
        if (data) {
            renderEvents(data.events, 'eventsContainer');
        }
    }

    // Check if we're on an event detail page
    const eventDetailContainer = document.getElementById('eventDetailContainer');
    if (eventDetailContainer) {
        // Prefer query param; fall back to legacy detail page paths.
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('id') || getEventIdFromPath();
        
        if (eventId) {
            const data = await loadEventsData();
            if (data) {
                renderEventDetail(eventId);
            }
        } else {
            eventDetailContainer.innerHTML = `
                <div class="mt-4 mb-3">
                    <div class="card-body event-details-content mt-2 text-center">
                        <h1 class="card-title event-title mb-3">Event not found</h1>
                        <p class="event-description">Please go back and open the event again.</p>
                        <a href="../events.html" class="btn btn-secondary">Back to Events</a>
                    </div>
                </div>
            `;
        }
    }
});

// Backward compatibility for older event detail URLs.
function getEventIdFromPath() {
    const path = window.location.pathname;
    if (path.includes('career-mentorship-event.html')) {
        return 'career-mentorship';
    }
    if (path.includes('diwali-event.html')) {
        return 'diwali';
    }
    if (path.includes('picnic-play-event.html')) {
        return 'picnic-play';
    }
    if (path.includes('tapasvi-online-event.html')) {
        return 'tapasvi';
    }
    if (path.includes('career-guidance-mentorship-event.html')) {
        return 'career-guidance-mentorship';
    }
    return null;
}
