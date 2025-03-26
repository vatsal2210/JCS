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
});
