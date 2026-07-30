(() => {
  "use strict";

  const navbar = document.querySelector(".floating-navbar");

  const updateNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 315);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  document.querySelectorAll(".navbar-collapse a:not(.dropdown-toggle)").forEach((link) => {
    link.addEventListener("click", () => {
      const openMenu = document.querySelector(".navbar-collapse.show");
      if (openMenu) {
        bootstrap.Collapse.getOrCreateInstance(openMenu).hide();
      }
    });
  });

  document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
  });
})();
