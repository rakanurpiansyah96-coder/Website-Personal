// =============================
// Fade-in awal
// =============================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // cek preferensi tema dari localStorage
  const savedTheme = localStorage.getItem("theme");
  const themeBtn = document.getElementById("theme-toggle");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.querySelector(".icon").textContent = "☀️";
  }
});

// =============================
// Fade section saat scroll
// =============================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);
document
  .querySelectorAll(".fade-section")
  .forEach((el) => observer.observe(el));

// =============================
// Theme toggle
// =============================
const themeBtn = document.getElementById("theme-toggle");
const soundPop = document.getElementById("sound-pop");
const soundSwitch = document.getElementById("sound-switch");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");

  // animasi rotasi
  themeBtn.classList.add("rotate");
  setTimeout(() => themeBtn.classList.remove("rotate"), 500);

  // ganti ikon
  themeBtn.querySelector(".icon").textContent = isLight ? "☀️" : "🌙";

  // mainkan suara
  if (isLight) {
    soundPop.currentTime = 0;
    soundPop.play();
  } else {
    soundSwitch.currentTime = 0;
    soundSwitch.play();
  }

  // simpan preferensi
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// =============================
// Modal & Slider untuk Projects
// =============================

// Buka modal
function openModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "flex";

  // reset slider ke slide pertama
  const slides = modal.querySelector(".slides");
  if (slides) {
    slides.style.transform = "translateX(0%)";
  }
}

// Tutup modal jika klik tombol close
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

// Tutup modal kalau klik area luar konten
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// Slider logic per modal
document.querySelectorAll(".modal").forEach((modal) => {
  const slides = modal.querySelector(".slides");
  const images = modal.querySelectorAll(".slides img");
  let index = 0;

  const showSlide = (i) => {
    if (!slides) return;
    if (i >= images.length) index = 0;
    else if (i < 0) index = images.length - 1;
    else index = i;

    slides.style.transform = `translateX(${-index * 100}%)`;
  };

  // panggil sekali untuk set awal
  showSlide(0);

  if (modal.querySelector(".next")) {
    modal.querySelector(".next").addEventListener("click", () => {
      showSlide(index + 1);
    });
  }

  if (modal.querySelector(".prev")) {
    modal.querySelector(".prev").addEventListener("click", () => {
      showSlide(index - 1);
    });
  }
});

// =============================
// Tabs logic
// =============================
document.querySelectorAll(".tabs").forEach((tabContainer) => {
  const buttons = tabContainer.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const modalContent = tabContainer.parentElement;

      // nonaktifkan semua tab
      modalContent
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      modalContent
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));

      // aktifkan tab yang dipilih
      btn.classList.add("active");
      const targetContent = modalContent.querySelector("#" + targetId);
      targetContent.classList.add("active");

      // reset slider ke slide pertama saat ganti tab
      const slides = targetContent.querySelector(".slides");
      if (slides) {
        slides.style.transform = "translateX(0%)";
      }
    });
  });
});
