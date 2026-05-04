const words = ["Fast deploys", "Modern code", "Solid logic", "Sharp pages"];
let current = 0;
const container = document.getElementById("changing-word");
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function scramble(nextWord, onDone) {
  let iteration = 0;
  const maxIterations = 12;

  container.innerHTML = nextWord
    .split("")
    .map((ch) => (ch === " " ? " " : `<span class="letter">${ch}</span>`))
    .join("");

  const spans = container.querySelectorAll(".letter");
  const targets = nextWord.split("").filter((c) => c !== " ");

  const interval = setInterval(() => {
    spans.forEach((span, i) => {
      if (iteration >= maxIterations) {
        span.textContent = targets[i];
      } else {
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
      }
    });

    iteration++;
    if (iteration > maxIterations) {
      clearInterval(interval);
      onDone();
    }
  }, 50);
}

function next() {
  scramble(words[current], () => {
    setTimeout(() => {
      current = (current + 1) % words.length;
      next();
    }, 3000);
  });
}

next();

/*NAVBAR*/
let lastScroll = 0;
const navbar = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  const diff = lastScroll - current;

  if (current > lastScroll) {
    navbar.style.transform = "translateY(-100%)"; // aşağı → gizle
  } else if (diff > 10) {
    navbar.style.transform = "translateY(0)"; // 10px yukarı çıkınca → göster
  }

  lastScroll = current;
});

/*AD MARQUEE*/
(() => {
  const track = document.getElementById("ad-marquee-track");

  if (!track) return;

  track.innerHTML = `
    <span class="ad-marquee-item">
    Empower your brand with <strong>digital strength!</strong>
    </span>
    <span class="ad-marquee-item">
    Empower your brand with <strong>digital strength!</strong>
    </span>
    <span class="ad-marquee-item">
    Empower your brand with <strong>digital strength!</strong>
    </span>
    <span class="ad-marquee-item">
    Empower your brand with <strong>digital strength!</strong>
    </span>
  `;

  let position = 0;

  function animateMarquee() {
    position -= 0.7;

    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }

    track.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
})();

/*MOBILE MENU*/
const menuOpenBtn = document.querySelector("[data-menu-open]");
const menuCloseBtn = document.querySelector("[data-menu-close]");
const menuBackdrop = document.querySelector("[data-menu-backdrop]");
const menuLinks = document.querySelectorAll(".mobile-menu-link");

function openMobileMenu() {
  menuBackdrop.classList.add("is-open");
  document.body.classList.add("menu-lock");
}

function closeMobileMenu() {
  menuBackdrop.classList.remove("is-open");
  document.body.classList.remove("menu-lock");
}

if (menuOpenBtn && menuCloseBtn && menuBackdrop) {
  menuOpenBtn.addEventListener("click", openMobileMenu);
  menuCloseBtn.addEventListener("click", closeMobileMenu);

  menuBackdrop.addEventListener("click", (event) => {
    if (event.target === menuBackdrop) {
      closeMobileMenu();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}
