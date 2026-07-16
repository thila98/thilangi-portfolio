// ================================
// Thilangi's Portfolio
// ================================

// Typing animation
const titles = [
  "Senior QA Engineer",
  "AI-Augmented Tester",
  "Test Automation Engineer",
  "QA Lead and Business Analyst",
  "Python Developer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function type() {
  const current = titles[titleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
  }
  setTimeout(type, isDeleting ? 60 : 100);
}

type();

// ================================
// Particles
// ================================

function createParticles() {
  const container = document.getElementById("particles");
  const colours = ["#F5D2D2", "#F8F7BA", "#BDE3C3", "#A3CCDA"];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 12 + 4;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colours[Math.floor(Math.random() * colours.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

createParticles();

// ================================
// Dark mode
// ================================

const themeBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
});

// ================================
// Mobile menu
// ================================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

function closeMobile() {
  mobileMenu.classList.remove("open");
}

// ================================
// Smooth scroll
// ================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ================================
// Navbar scroll effect
// ================================

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ================================
// Scroll animations
// ================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  ".project-card, .skill-category, .timeline-item, .cert-card, .highlight, .contact-card"
).forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});

// ================================
// Demo example text rotation
// ================================

const examples = [
  "User login with email and password. After 3 failed attempts the account locks for 15 minutes.",
  "File upload feature that accepts PDF and DOCX files up to 10MB in size.",
  "Password reset flow via email. Link expires after 24 hours.",
  "Search functionality with filters for date range and category."
];

let exampleIndex = 0;
const exampleEl = document.getElementById("exampleText");

function rotateExample() {
  if (exampleEl) {
    exampleEl.style.opacity = "0";
    setTimeout(() => {
      exampleEl.textContent = examples[exampleIndex];
      exampleEl.style.opacity = "1";
      exampleIndex = (exampleIndex + 1) % examples.length;
    }, 300);
  }
}

if (exampleEl) {
  exampleEl.textContent = examples[0];
  exampleEl.style.transition = "opacity 0.3s ease";
  setInterval(rotateExample, 4000);
}

// ================================
// Live AI Demo
// ================================

async function generateTestCases() {
  const input = document.getElementById("featureInput").value.trim();
  const output = document.getElementById("demoOutput");
  const loading = document.getElementById("loadingMsg");
  const btn = document.getElementById("generateBtn");

  if (!input) {
    output.textContent = "Please enter a feature description first.";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Generating...";
  loading.style.display = "flex";
  output.textContent = "";

  const prompt = `You are a Senior QA Engineer with 10 years of experience.

Given this feature description, generate 10 structured test cases covering Functional, Negative, Boundary, Security and UI-UX scenarios.

FEATURE:
${input}

For each test case use this exact format:
TC_ID | Category | Title | Expected Result | Priority

Rules:
- TC_ID: TC_001, TC_002 etc
- Priority: High / Medium / Low
- Start directly with TC_001
- No introduction text`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.content[0].text;
    loading.style.display = "none";
    btn.disabled = false;
    btn.textContent = "Generate Test Cases with AI";
    output.textContent = text;

  } catch (err) {
    loading.style.display = "none";
    btn.disabled = false;
    btn.textContent = "Generate Test Cases with AI";
    output.textContent = "Something went wrong. Please try again.";
  }
}

// ================================
// AI Chat Widget
// ================================

const THILANGI_CONTEXT = `You are an AI assistant on Thilangi Uththara De Silva's portfolio website. Answer questions about her professionally and accurately.

About Thilangi:
- Senior QA Engineer with 3+ years of experience based in Galle, Sri Lanka
- Works remotely for US clients
- Currently at Sopify.AI (B2B SaaS, QA Lead) and Farmers District 46 (automation engineer)
- Previously: Freelance QA, Commercial Credit and Finance PLC, Third Space Global
- Education: BSc Computer Science First Class Honours from University of Bedfordshire, SQA Professional Programme from SLIIT (Grade A-)
- Skills: Python, Java, JavaScript, SQL, Playwright, Selenium, pytest, TestNG, Postman, JMeter, Katalon Studio, Mabl, Make.com, Docker, GitHub Actions, Claude API, Hermes AI
- Projects: AI Test Case Generator (Python + Claude API), REST API Testing Framework (25 tests), QA Metrics Dashboard (Streamlit, live), QA Knowledge Base (MkDocs, GitHub Pages)
- Certifications: API Testing (Postman), Mabl Foundations, Product Owner (Udemy), Agile Product Management (Udemy), Mastering Postman (Udemy), AWS Solutions Architect (Udemy), PMP Master Course (Udemy), JavaScript (LinkedIn Learning)
- Currently studying: ISTQB CTFL
- Planning to migrate to Australia or Canada
- Interested in AI-powered testing, automation, and QA + BA + PM crossover roles
- GitHub: github.com/thila98
- LinkedIn: linkedin.com/in/thilangi-de-silva-66bb0b190

Keep answers concise, friendly and professional. If asked something not related to Thilangi's professional profile, politely redirect to relevant topics.`;

let chatHistory = [];

function toggleChat() {
  const box = document.getElementById("chatBox");
  const icon = document.getElementById("chatIcon");
  if (box.style.display === "none") {
    box.style.display = "block";
    icon.textContent = "✕";
  } else {
    box.style.display = "none";
    icon.textContent = "💬";
  }
}

async function sendChat() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");
  const text = input.value.trim();

  if (!text) return;

  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "chat-msg user";
  userMsg.textContent = text;
  messages.appendChild(userMsg);
  messages.scrollTop = messages.scrollHeight;
  input.value = "";

  // Add to history
  chatHistory.push({ role: "user", content: text });

  // Show typing indicator
  const typing = document.createElement("div");
  typing.className = "chat-msg bot";
  typing.textContent = "...";
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 300,
        system: THILANGI_CONTEXT,
        messages: chatHistory
      })
    });

    const data = await response.json();
    const reply = data.content[0].text;

    chatHistory.push({ role: "assistant", content: reply });

    typing.textContent = reply;
    messages.scrollTop = messages.scrollHeight;

  } catch (err) {
    typing.textContent = "Sorry, something went wrong. Please try again.";
  }
}
