// Navbar scroll effect - darken on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const scrollPosition = window.scrollY;

  // Change background color based on scroll position
  // Start darkening after scrolling 100px
  const opacity = Math.min(scrollPosition / 300, 0.9);
  navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
});

// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Animate hamburger
      const spans = hamburger.querySelectorAll("span");
      if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(10px, 10px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)";
      } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      }
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      });
    });
  }
});

// Smooth scroll for CTA buttons
document.addEventListener("DOMContentLoaded", function () {
  const ctaButtons = document.querySelectorAll(".cta-btn, .book-btn");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.textContent.includes("Book")) {
        e.preventDefault();
        const exploreSection = document.getElementById("explore");
        if (exploreSection) {
          exploreSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});

// Newsletter Form Handler
document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(email)) {
        // Show success message
        showNotification("Thank you for subscribing!", "success");
        emailInput.value = "";
      } else {
        showNotification("Please enter a valid email address.", "error");
      }
    });
  }
});

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196F3"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInNotification 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutNotification 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add animation styles for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInNotification {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutNotification {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// View Button Functionality
document.addEventListener("DOMContentLoaded", function () {
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const cardTitle =
        this.closest(".offer-card").querySelector("h4").textContent;
      showNotification(`Loading details for ${cardTitle}...`, "info");
    });
  });
});

// Sale Button Functionality
document.addEventListener("DOMContentLoaded", function () {
  const saleButtons = document.querySelectorAll(".sale-btn");

  saleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const card = this.closest(".offer-card");
      const cardTitle = card.querySelector("h4").textContent;
      const price = card.querySelector(".price").textContent;
      showNotification(
        `Special offer for ${cardTitle}: Get 20% off! Price: ${price}`,
        "success",
      );
    });
  });
});

// Read More Links
document.addEventListener("DOMContentLoaded", function () {
  const readMoreLinks = document.querySelectorAll(".read-more");

  readMoreLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const articleTitle =
        this.closest(".blog-content").querySelector("h3").textContent;
      showNotification(`Opening full article: "${articleTitle}"`, "info");
    });
  });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe location cards
document.addEventListener("DOMContentLoaded", function () {
  const locationCards = document.querySelectorAll(".location-card");
  locationCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});

// Observe offer cards
document.addEventListener("DOMContentLoaded", function () {
  const offerCards = document.querySelectorAll(".offer-card");
  offerCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Observe blog cards
document.addEventListener("DOMContentLoaded", function () {
  const blogCards = document.querySelectorAll(".blog-card");
  blogCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});

// Active Navigation Link on Scroll
window.addEventListener("scroll", function () {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
      link.style.color = "var(--primary-color)";
    } else {
      link.style.color = "";
    }
  });
});

// Add fade-in animation on page load
window.addEventListener("load", function () {
  document.body.style.opacity = "1";
});

document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";
document.body.style.opacity = "1";

// Lazy loading placeholder
window.addEventListener("load", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
    // img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
  });
});

const track = document.querySelector(".slider-track");
const sliderControls = document.querySelector(".slider-controls");
const prevBtn = sliderControls.querySelector(".prev");
const nextBtn = sliderControls.querySelector(".next");
const dotsContainer = sliderControls.querySelector(".slider-dots");

const cards = document.querySelectorAll(".slider-track .card");
const cardWidth = cards[0].offsetWidth + 20; // width + gap
const visibleCards = 6;
let index = 0;

// Create dots
const totalSlides = Math.ceil(cards.length / visibleCards);

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    index = i;
    updateSlider();
  });
}

function updateSlider() {
  // Максимальний зсув (щоб останній слайд показував останні картки)
  const maxScroll = (cards.length - visibleCards) * cardWidth;
  let scrollLeft = index * cardWidth * visibleCards;
  if (scrollLeft > maxScroll) scrollLeft = maxScroll > 0 ? maxScroll : 0;
  track.scrollTo({
    left: scrollLeft,
    behavior: "smooth",
  });

  dotsContainer.querySelectorAll("span").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

nextBtn.addEventListener("click", () => {
  if (index < totalSlides - 1) {
    index++;
    updateSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});
