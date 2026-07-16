// ================================
// Thilangi's Portfolio - main.js
// ================================

// Typing animation
const titles = [
  "Senior QA Engineer",
  "AI-Augmented Tester",
  "Test Automation Engineer",
  "QA Lead & Business Analyst",
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
// Dark mode toggle
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
// Smooth scroll for nav links
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
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
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

document.querySelectorAll(".project-card, .skill-category, .timeline-item, .cert-card, .info-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});

// ================================
// Live AI Demo - Test Case Generator
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
  loading.style.display = "block";
  output.textContent = "";

  const prompt = `You are a Senior QA Engineer with 10 years of experience.

Given this feature description, generate 10 test cases covering Functional, Negative, Boundary, Security and UI-UX scenarios.

FEATURE:
${input}

For each test case provide:
TC_ID | Category | Title | Expected Result | Priority

Start directly with TC_001. No introduction text.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    btn.textContent = "Generate Test Cases";
    output.textContent = text;

  } catch (err) {
    loading.style.display = "none";
    btn.disabled = false;
    btn.textContent = "Generate Test Cases";
    output.textContent = "Something went wrong. Please try again.";
  }
}
