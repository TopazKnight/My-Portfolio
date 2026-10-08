document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const themeToggle = document.getElementById("themeToggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section");

  // Inisialisasi ProjectEngine
  const engine = new ProjectEngine("data/cases.json", "projectsGrid");
  engine.loadProjects();

  // Pengaturan Filter Button Project
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      engine.filterProjects(category);
    });
  });

  // Set tahun hak cipta secara otomatis
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Toggle Menu Navigasi Seluler
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Dark/Light Mode
  const themeIcon = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  const applyTheme = (isLight) => {
    if (isLight) {
      body.classList.add("light");
      if (themeIcon) themeIcon.textContent = "☀";
    } else {
      body.classList.remove("light");
      if (themeIcon) themeIcon.textContent = "☾";
    }
  };

  if (savedTheme) {
    applyTheme(savedTheme === "light");
  } else {
    applyTheme(systemPrefersLight);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = !body.classList.contains("light");
      applyTheme(isLight);
      localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });
  }

  // Scroll Header Effect & Active Nav Link
  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }

    let currentSection = "home";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentSection}`);
    });
  });

  // Intersection Observer
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }
});
