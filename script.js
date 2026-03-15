// ===== CAROUSEL =====
const track   = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dots    = document.querySelectorAll(".dot");

let current = 0;
const total = document.querySelectorAll(".carousel-item").length;

function goTo(index) {
  current = (index + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

nextBtn.addEventListener("click", () => { resetTimer(); goTo(current + 1); });
prevBtn.addEventListener("click", () => { resetTimer(); goTo(current - 1); });
dots.forEach((dot, i) => dot.addEventListener("click", () => { resetTimer(); goTo(i); }));

// Swipe táctil
let tx = 0;
track.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
track.addEventListener("touchend",   e => {
  const d = tx - e.changedTouches[0].clientX;
  if (Math.abs(d) > 48) { resetTimer(); goTo(current + (d > 0 ? 1 : -1)); }
});

// Autoplay
let timer = setInterval(() => goTo(current + 1), 5000);
function resetTimer() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5000); }
const stage = document.querySelector(".carousel-stage");
stage?.addEventListener("mouseenter", () => clearInterval(timer));
stage?.addEventListener("mouseleave", () => { timer = setInterval(() => goTo(current + 1), 5000); });

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
