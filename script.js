// JavaScript for Jain Community Services of Canada

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      
      // Close mobile nav if open
      const navToggler = document.querySelector('.navbar-toggler');
      const navCollapse = document.querySelector('.navbar-collapse');
      if (navCollapse.classList.contains('show')) {
        navToggler.click();
      }
      
      // Smooth scroll to target
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Adjust based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Active nav item based on scroll position
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".navbar-nav .nav-link");
  
  function setActiveNavItem() {
    // Get current scroll position
    const scrollPosition = window.scrollY;
    
    // Find the appropriate section
    let current = "";
    
    // Loop through sections to determine which one is currently in view
    sections.forEach((section) => {
      // Get section dimensions
      const sectionTop = section.offsetTop - 100; // Offset for navbar
      const sectionHeight = section.clientHeight;
      const sectionBottom = sectionTop + sectionHeight;
      
      // Check if we're in this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        current = section.getAttribute("id");
      }
    });
    
    // If we have a current section, highlight it in the nav
    if (current) {
      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
        if (navItem.getAttribute("href") === `#${current}`) {
          navItem.classList.add("active");
        }
      });
    }
  }
  
  // Call on page load and scroll
  setActiveNavItem();
  window.addEventListener("scroll", setActiveNavItem);

  // Form submission (if contact form exists)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Here you would typically send this data to a server
      console.log("Form submitted:", { name, email, message });

      alert("Thank you for your message. We will get back to you soon!");
      contactForm.reset();
    });
  }
  
  // Enhanced navbar scrolling effect
  function handleNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.padding = '8px 0';
      navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.padding = '12px 0';
      navbar.style.boxShadow = '0 1px 8px rgba(0, 0, 0, 0.08)';
    }
  }
  
  // Initial check on page load
  handleNavbarOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', () => {
    setActiveNavItem();
    handleNavbarOnScroll();
  });

  // Events Carousel
  const eventsCarousel = document.getElementById('eventsCarousel');
  if (eventsCarousel) {
    const carouselInner = eventsCarousel.querySelector('.carousel-inner');
    const carouselIndicators = eventsCarousel.querySelector('.carousel-indicators');
    const eventModal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    
    // Function to show event details in modal
    function showEventDetails(eventData) {
      const modal = document.getElementById('eventDetailsModal');
      modal.querySelector('.event-image img').src = eventData.imageUrl;
      modal.querySelector('.event-title').textContent = eventData.title;
      modal.querySelector('.event-description').innerHTML = eventData.fullDescription;
      eventModal.show();
    }
    
    // Function to add a carousel item
    function addCarouselItem(eventData, isActive = false) {
      // Create carousel item
      const item = document.createElement('div');
      item.className = `carousel-item ${isActive ? 'active' : ''}`;
      item.style.backgroundImage = `url('${eventData.imageUrl}')`;
      
      // Create caption
      const caption = document.createElement('div');
      caption.className = 'carousel-caption';
      caption.innerHTML = `
        <h3>${eventData.title}</h3>
        <p>${eventData.shortDescription}</p>
        <button class="btn btn-primary" onclick='window.showEventDetails(${JSON.stringify(eventData)})'>Learn More</button>
      `;
      
      item.appendChild(caption);
      carouselInner.appendChild(item);
      
      // Create indicator
      const indicator = document.createElement('button');
      indicator.type = 'button';
      indicator.setAttribute('data-bs-target', '#eventsCarousel');
      indicator.setAttribute('data-bs-slide-to', carouselIndicators.children.length);
      if (isActive) {
        indicator.className = 'active';
        indicator.setAttribute('aria-current', 'true');
      }
      carouselIndicators.appendChild(indicator);
    }
    
    // Make showEventDetails function globally available
    window.showEventDetails = showEventDetails;
    
    // Completed Event Data
    const completedEvent = {
      imageUrl: '/assets/events_images/Career_Guidance_&_Mentorship_session/JCS Career Guidance and Lifetime Achievement Award Committee photo - May 03, 2025.jpg',
      title: 'Jain Community Services of Canada Hosts Milestone Event Celebrating Community Service and Empowering Careers',
      shortDescription: 'A successful evening celebrating community service and career development.',
      fullDescription: `
        <p>Jain Community Services of Canada (JCS) successfully hosted a landmark event that celebrated both community service excellence and career development within the Jain community. The event featured two significant components:</p>
        
        <h4>Lifetime Achievement Award Ceremony</h4>
        <p>We honored distinguished members of our community who have demonstrated exceptional dedication to service and made lasting contributions to society. This recognition celebrated their lifetime of commitment to our community's values and principles.</p>
        
        <h4>Career Guidance and Mentorship Session</h4>
        <p>The event included an interactive career development session featuring:</p>
        <ul>
          <li>Expert-led workshops on career planning and professional development</li>
          <li>One-on-one mentorship opportunities with industry leaders</li>
          <li>Networking sessions with professionals from various fields</li>
          <li>Resources and guidance for career advancement</li>
        </ul>
        
        <p>The event was a great success, bringing together community members to both celebrate our achievements and invest in our future through career development and mentorship.</p>
      `
    };
    
    // Add the completed event to the carousel
    addCarouselItem(completedEvent, true);
  }
});



