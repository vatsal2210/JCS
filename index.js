// JavaScript for Jain Community Services of Canada

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Here you would typically send this data to a server
      // For now, we'll just log it to the console
      console.log("Form submitted:", { name, email, message });

      // You can add code here to send an email using a service like EmailJS
      // or to submit the form data to a server-side script

      alert("Thank you for your message. We will get back to you soon!");
      contactForm.reset();
    });
  }
});
