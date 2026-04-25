const themeToggle = document.getElementById("themeToggle");
const greeting = document.getElementById("greeting");

const projectSearch = document.getElementById("projectSearch");
const projectFilter = document.getElementById("projectFilter");
const projectSort = document.getElementById("projectSort");
const projectsContainer = document.getElementById("projectsContainer");
const emptyState = document.getElementById("emptyState");
const projectStatus = document.getElementById("projectStatus");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const revealElements = document.querySelectorAll(".reveal");

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const navLinks = document.querySelectorAll("#mobileNav a");

const visitorNameInput = document.getElementById("visitorName");
const saveNameBtn = document.getElementById("saveNameBtn");
const clearNameBtn = document.getElementById("clearNameBtn");
const welcomeMessage = document.getElementById("welcomeMessage");
const visitTimer = document.getElementById("visitTimer");

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quotesStatus = document.getElementById("quotesStatus");
const prevQuoteBtn = document.getElementById("prevQuoteBtn");
const nextQuoteBtn = document.getElementById("nextQuoteBtn");

let quotes = [];
let currentQuoteIndex = 0;
let quoteInterval = null;

// Theme
function loadTheme() {
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

if (themeToggle) {
  loadTheme();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

function setGreeting() {
  if (!greeting) return;

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

function loadVisitorName() {
  if (!welcomeMessage) return;

  const savedName = localStorage.getItem("visitorName");

  if (savedName) {
    welcomeMessage.textContent = `Welcome back, ${savedName}!`;
  } else {
    welcomeMessage.textContent = "Welcome! Enter your name for a personalized greeting.";
  }
}

if (saveNameBtn && visitorNameInput && welcomeMessage) {
  saveNameBtn.addEventListener("click", () => {
    const name = visitorNameInput.value.trim();

    if (!name) {
      welcomeMessage.textContent = "Please enter your name first.";
      return;
    }

    localStorage.setItem("visitorName", name);
    welcomeMessage.textContent = `Welcome, ${name}! Your name has been saved.`;
    visitorNameInput.value = "";
  });
}

if (clearNameBtn && welcomeMessage) {
  clearNameBtn.addEventListener("click", () => {
    localStorage.removeItem("visitorName");
    welcomeMessage.textContent = "Saved name cleared.";
    if (visitorNameInput) visitorNameInput.value = "";
  });
}

loadVisitorName();

// Projects
function updateProjects() {
  if (!projectsContainer) return;

  const cards = Array.from(projectsContainer.querySelectorAll(".project-card"));
  const searchValue = projectSearch ? projectSearch.value.toLowerCase().trim() : "";
  const filterValue = projectFilter ? projectFilter.value.toLowerCase() : "all";
  const sortValue = projectSort ? projectSort.value.toLowerCase() : "default";

  cards.forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase();
    const category = (card.dataset.category || "").toLowerCase();

    const matchesSearch = title.includes(searchValue) || category.includes(searchValue);
    const matchesFilter = filterValue === "all" || category === filterValue;

    if (matchesSearch && matchesFilter) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  const visibleCards = cards.filter((card) => !card.classList.contains("hidden"));

  if (sortValue === "az") {
    visibleCards.sort((a, b) =>
      (a.dataset.title || "").localeCompare(b.dataset.title || "")
    );
  } else if (sortValue === "za") {
    visibleCards.sort((a, b) =>
      (b.dataset.title || "").localeCompare(a.dataset.title || "")
    );
  }

  visibleCards.forEach((card) => projectsContainer.appendChild(card));

  if (emptyState && projectStatus) {
    if (visibleCards.length === 0) {
      emptyState.classList.remove("hidden");
      projectStatus.textContent = "0 projects found";
    } else {
      emptyState.classList.add("hidden");
      projectStatus.textContent =
        searchValue === "" && filterValue === "all"
          ? `Showing all projects (${visibleCards.length})`
          : `${visibleCards.length} project(s) found`;
    }
  }
}

if (projectSearch) projectSearch.addEventListener("input", updateProjects);
if (projectFilter) projectFilter.addEventListener("change", updateProjects);
if (projectSort) projectSort.addEventListener("change", updateProjects);

updateProjects();

function showFormMessage(message, type) {
  if (!formMessage) return;

  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

let isSubmitting = false;

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      showFormMessage("Please fill in all fields before submitting.", "error");
      return;
    }

    if (!emailPattern.test(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    if (message.length < 15) {
      showFormMessage("Message must be at least 15 characters long.", "error");
      return;
    }

    isSubmitting = true;
    showFormMessage("Sending the message...", "loading");

    setTimeout(() => {
      showFormMessage(
        `Thank you, ${name}! Your message has been sent successfully.`,
        "success"
      );
      contactForm.reset();
      isSubmitting = false;
    }, 1000);
  });
}

// Mobile menu
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

function startVisitTimer() {
  if (!visitTimer) return;

  let secondsOnSite = 0;

  setInterval(() => {
    secondsOnSite++;
    visitTimer.textContent = `You have been here for ${secondsOnSite} second(s).`;
  }, 1000);
}

startVisitTimer();

// Quotes using DummyJSON
const fallbackQuotes = [
  { quote: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "Small deeds done are better than great deeds planned.", author: "Peter Marshall" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

function displayQuote(index) {
  if (!quotes.length || !quoteText || !quoteAuthor) return;

  const quote = quotes[index];
  quoteText.classList.remove("fade-quote");
  quoteAuthor.classList.remove("fade-quote");

  void quoteText.offsetWidth;

  quoteText.textContent = `"${quote.quote}"`;
  quoteAuthor.textContent = `— ${quote.author}`;
  quoteText.classList.add("fade-quote");
  quoteAuthor.classList.add("fade-quote");
}

function showNextQuote() {
  if (!quotes.length) return;
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  displayQuote(currentQuoteIndex);
}

function showPrevQuote() {
  if (!quotes.length) return;
  currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
  displayQuote(currentQuoteIndex);
}

function startQuoteRotation() {
  if (quoteInterval) clearInterval(quoteInterval);
  quoteInterval = setInterval(showNextQuote, 5000);
}

async function loadQuotes() {
  if (!quotesStatus || !quoteText || !quoteAuthor) return;

  quotesStatus.textContent = "Loading quotes...";

  try {
    const response = await fetch("https://dummyjson.com/quotes?limit=10");

    if (!response.ok) {
      throw new Error("Failed to fetch quotes.");
    }

    const data = await response.json();

    if (!data.quotes || !Array.isArray(data.quotes) || data.quotes.length === 0) {
      throw new Error("No quotes returned.");
    }

    quotes = data.quotes;
    currentQuoteIndex = 0;

    displayQuote(currentQuoteIndex);
    quotesStatus.textContent = "Quotes update automatically every 5 seconds.";
    startQuoteRotation();
  } catch (error) {
    quotes = fallbackQuotes;
    currentQuoteIndex = 0;
    displayQuote(currentQuoteIndex);
    quotesStatus.textContent =
      "Could not load quotes from the API, so fallback quotes are being shown.";
    startQuoteRotation();
  }
}

if (nextQuoteBtn) {
  nextQuoteBtn.addEventListener("click", () => {
    showNextQuote();
    startQuoteRotation();
  });
}

if (prevQuoteBtn) {
  prevQuoteBtn.addEventListener("click", () => {
    showPrevQuote();
    startQuoteRotation();
  });
}

loadQuotes();

if (downloadCvBtn) {
  downloadCvBtn.addEventListener("click", () => {
    console.log("CV download started.");
  });
}