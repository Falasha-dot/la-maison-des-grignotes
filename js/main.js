/* ============================================================
   MAIN — lightbox galerie + interactions générales
   ============================================================ */

function initLightbox() {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  if (!items.length || !lightbox) return;

  const imgEl = lightbox.querySelector(".lightbox-inner img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + items.length) % items.length;
    const img = items[currentIndex].querySelector("img");
    imgEl.src = img.src;
    imgEl.alt = img.alt;
  }

  function open(index) {
    show(index);
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => open(index));
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "Agrandir l'image");
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(index);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => show(currentIndex - 1));
  nextBtn.addEventListener("click", () => show(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });
}

function initContactLinks() {
  document.querySelectorAll("[data-tel-link]").forEach((el) => {
    el.href = `tel:+225${CONFIG.telephoneLien}`;
  });
  document.querySelectorAll("[data-mail-link]").forEach((el) => {
    el.href = `mailto:${CONFIG.email}`;
  });
  document.querySelectorAll("[data-fb-link]").forEach((el) => {
    if (CONFIG.reseaux.facebook) {
      el.href = CONFIG.reseaux.facebook;
    } else {
      el.setAttribute("aria-disabled", "true");
      el.title = "Lien Facebook à venir";
    }
  });
  document.querySelectorAll("[data-ig-link]").forEach((el) => {
    if (CONFIG.reseaux.instagram) {
      el.href = CONFIG.reseaux.instagram;
    } else {
      el.setAttribute("aria-disabled", "true");
      el.title = "Lien Instagram à venir";
    }
  });
}

function initCarousels() {
  document.querySelectorAll(".carousel-next").forEach((btn) => {
    const track = btn.parentElement.querySelector(".carousel-track");
    if (!track) return;
    btn.addEventListener("click", () => {
      const cardWidth = track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + 22 : 260;
      track.scrollBy({ left: cardWidth * 1.5, behavior: "smooth" });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLightbox();
  initContactLinks();
  initCarousels();
});
