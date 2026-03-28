const themeToggle = document.getElementById("themeToggle");
const greeting = document.getElementById("greeting");
const projectSearch = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.getElementById("emptyState");
const projectStatus = document.getElementById("projectStatus");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const revealElements = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const navLinks = document.querySelectorAll("#mobileNav a");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

//this is a dynamic greeting function based on hours of the day
function setGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    greeting.textContent = "Good Morning 👋";
  } else if (hour < 17) {
    greeting.textContent = "Good Afternoon 👋";
  } else {
    greeting.textContent = "Good Evening 👋";
  }
}

setGreeting();

function filterProjects() {
  const searchValue = projectSearch.value.toLowerCase().trim();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category.toLowerCase();
    const matches = title.includes(searchValue) || category.includes(searchValue);

    if (matches) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  if (visibleCount === 0) {
    emptyState.classList.remove("hidden");
    projectStatus.textContent = "0 projects found";
  } else {
    emptyState.classList.add("hidden");
    projectStatus.textContent = searchValue === "" ? "Showing all projects" : `${visibleCount} project(s) found`;
  }
}

if (projectSearch) {
  projectSearch.addEventListener("input", filterProjects);
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      showFormMessage("Please fill in all fields before submitting.", "error");
      return;
    }

    if (!emailPattern.test(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    showFormMessage("Sending the message......", "loading");

    setTimeout(() => {
      showFormMessage(`Thank you, ${name}! Your message has been sent successfully.`, "success");
      contactForm.reset();
    }, 1000);
  });
}

//Mobile Menu
if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      mobileNav.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}



window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
