document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
const form = document.querySelector(".newsletter");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (input.value.trim()) {
      form.reset();
      alert("Thank you for subscribing.");
    }
  });
}
window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header");

  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});
const platformImage = document.getElementById("platformImage");
const platformIcon = document.getElementById("platformIcon");

document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
  tab.addEventListener("shown.bs.tab", function (e) {
    platformImage.style.opacity = "0";

    setTimeout(() => {
      if (e.target.dataset.bsTarget === "#compass") {
        platformImage.src = "assets/images/compass pic.jpg";
        platformIcon.className = "far fa-compass";
      } else {
        platformImage.src = "assets/images/navigator-img.png";
        platformIcon.className = "fab fa-telegram";
      }

      platformImage.style.opacity = "1";
    }, 200);
  });
});
