const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const revealTargets = document.querySelectorAll(".reveal");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeNav() {
  nav.classList.remove("is-open");
  navToggle.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  header.classList.remove("is-open");
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  header.classList.toggle("is-open", isOpen);
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeNav();
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

document.querySelectorAll("details").forEach((details) => {
  details.addEventListener("toggle", () => {
    if (!details.open) return;

    document.querySelectorAll("details[open]").forEach((openDetails) => {
      if (openDetails !== details) {
        openDetails.removeAttribute("open");
      }
    });
  });
});

document.querySelectorAll("[data-portfolio-slider]").forEach((slider) => {
  const track = slider.querySelector("[data-portfolio-track]");
  const prev = slider.querySelector("[data-portfolio-prev]");
  const next = slider.querySelector("[data-portfolio-next]");

  if (!track || !prev || !next) return;

  function getScrollAmount() {
    const card = track.querySelector(".portfolio-card");
    if (!card) return track.clientWidth;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });
});
