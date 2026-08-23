/* ============================================================
   ANIMATIONS — scroll reveal, header au scroll, menu mobile
   ============================================================ */

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("mobile-nav");
  if (!btn || !nav) return;

  const close = () => {
    btn.classList.remove("active");
    nav.classList.remove("open");
    document.body.style.overflow = "";
  };

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.classList.toggle("active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initHeaderScroll();
  initMobileMenu();
});
