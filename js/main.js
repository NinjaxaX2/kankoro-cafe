document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navbar");
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 30);
  });

  toggle?.addEventListener("click", () => {
    const isOpen = links?.classList.contains("open");
    links?.classList.toggle("open");
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  });

  document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      links?.classList.remove("open");
      document.body.style.overflow = "auto";
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links?.classList.contains("open")) {
      links.classList.remove("open");
      document.body.style.overflow = "auto";
    }
  });

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        reveal.unobserve(entry.target);
      }
    });
  }, {threshold:.12});

  document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

  document.querySelectorAll(".menu-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".menu-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.dataset.category;
      document.querySelectorAll(".dish-card").forEach(card => {
        card.style.display = category === "all" || card.dataset.category === category ? "" : "none";
      });
    });
  });

  document.querySelectorAll(".panel button").forEach(button => {
    button.addEventListener("click", () => {
      button.parentElement.classList.toggle("open");
      const icon = button.querySelector("span");
      if (icon) icon.textContent = button.parentElement.classList.contains("open") ? "−" : "+";
    });
  });

  document.querySelectorAll("[data-lightbox]").forEach(img => {
    img.addEventListener("click", () => {
      const box = document.querySelector(".lightbox");
      const target = box?.querySelector("img");
      if (box && target) {
        target.src = img.src;
        box.classList.add("open");
      }
    });
  });

  document.querySelector(".lightbox-close")?.addEventListener("click", () => {
    document.querySelector(".lightbox")?.classList.remove("open");
  });
});