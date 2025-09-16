// Fade-in awal
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

// Fade section saat scroll
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

// Theme toggle
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

