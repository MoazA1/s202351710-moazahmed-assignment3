# Technical Documentation

## Project Overview

This project is a personal portfolio web application developed using HTML, CSS, and JavaScript. It demonstrates modern frontend development practices through responsive design, interactive components, and dynamic data handling.

The application is entirely client-side and focuses on usability, performance, and clean architecture. It provides users with an engaging interface to explore projects, view dynamic content, and interact with various features.

### Key Objectives

- Apply modern UI/UX design principles  
- Implement dynamic client-side logic  
- Manage state using browser storage (`localStorage`)  
- Integrate external APIs  
- Maintain clean, modular, and readable code  

---

## System Architecture

The application follows a **static frontend architecture**:

- No backend or server-side processing  
- All logic handled in the browser  
- External data retrieved via API calls  

### Architecture Flow

1. HTML defines structure  
2. CSS handles styling and responsiveness  
3. JavaScript manages logic and interactivity  
4. API provides dynamic content (quotes)  
5. localStorage maintains persistent user data  

---

## Technologies Used

### HTML5
- Provides semantic structure using elements such as:
  - `<header>`, `<main>`, `<section>`, `<footer>`
- Improves accessibility and SEO
- Organizes content into logical sections

### CSS3
- Handles layout, styling, and responsiveness
- Uses:
  - Flexbox for alignment
  - CSS Grid for layout
  - CSS variables for theme management
- Implements:
  - Dark/light mode
  - Animations (fade, hover effects)
  - Media queries for responsive design

### JavaScript (ES6)
- Core logic of the application
- Handles:
  - DOM manipulation
  - Event handling
  - API requests
  - State management
- Uses modern features:
  - Arrow functions
  - Template literals
  - `fetch()` API
  - `const` and `let`

### DummyJSON API
- External REST API used to fetch quotes
- Endpoint:
  https://dummyjson.com/quotes?limit=10
- Returns JSON data used to dynamically update UI

---

## File Structure

```bash
project-folder/
│
├── index.html          # Main HTML structure
├── css/
│   └── styles.css     # Styling and responsive design
├── js/
│   └── script.js      # Application logic
└── assets/
    ├── images/        # Images used in the UI
    └── files/         # Downloadable files (CV)

