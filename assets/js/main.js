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

/* go to top*/
const topButton = document.querySelector(".top-button-link");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 200) {
    topButton.classList.add("active");
  } else {
    topButton.classList.remove("active");
  }
});

const platformImage = document.getElementById("platformImage");
const platformIcon = document.getElementById("platformIcon");

document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
  tab.addEventListener("shown.bs.tab", function (e) {
    platformImage.style.opacity = "0";

    setTimeout(() => {
      if (e.target.dataset.bsTarget === "#compass") {
        platformImage.src = "assets/images/compass-platform.jpg";
        platformIcon.className = "far fa-compass";
      } else {
        platformImage.src = "assets/images/navigator-platform.png";
        platformIcon.className = "fab fa-telegram";
      }

      platformImage.style.opacity = "1";
    }, 200);
  });
});

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

//core capabilities scroll
const section = document.querySelector(".capabilities-section");
const windowBox = document.querySelector(".capabilities-window");
const track = document.querySelector(".capabilities-track");

function capabilityScroll() {
  if (!section || !windowBox || !track) return;

  const sectionTop = section.offsetTop;
  const scrollDistance = section.offsetHeight - window.innerHeight;
  const currentScroll = window.scrollY - sectionTop;

  const progress = Math.min(Math.max(currentScroll / scrollDistance, 0), 1);

  const maxMove = Math.max(track.scrollHeight - windowBox.clientHeight, 0);

  track.style.transform = `translateY(-${progress * maxMove}px)`;
}

window.addEventListener("scroll", capabilityScroll);
window.addEventListener("resize", capabilityScroll);

capabilityScroll();

//Contact us page
document.querySelectorAll(".date-time-group").forEach((group) => {
  const input = group.querySelector(".date-time-input");

  group.addEventListener("click", () => {
    input.focus();
    if (typeof input.showPicker === "function") {
      input.showPicker();
    }
  });
});

/*Active of navbar*/

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navbar-nav a[href]").forEach((link) => {
    const linkPage = link.getAttribute("href").split("#")[0].split("/").pop();

    if (linkPage === currentPage) {
      // Active current page
      link.classList.add("active");

      const dropdown = link.closest(".dropdown");
      if (dropdown) {
        dropdown.querySelector(".dropdown-toggle").classList.add("active");
      }
    }
  });
});

//loader

window.addEventListener("load", function () {
  const pageLoader = document.getElementById("page-loader");

  pageLoader.classList.add("loader-hidden");

  setTimeout(function () {
    pageLoader.remove();
  }, 500);
});
