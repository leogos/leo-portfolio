/* PAGE LOADER */
window.addEventListener("load", () => {
  document.body.classList.remove("is-loading");
  document.body.classList.add("is-loaded");
});

/* HERO WORD ANIMATION */
const words = ["Fast deploys", "Modern code", "Solid logic", "Sharp pages"];
let current = 0;
const container = document.getElementById("changing-word");
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

if (container) {
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
}

/* NAVBAR */
let lastScroll = 0;
const navbar = document.querySelector(".site-header");

if (navbar) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const scrollDifference = lastScroll - currentScroll;

    if (currentScroll <= 20) {
      navbar.classList.remove("is-hidden");
    } else if (currentScroll > lastScroll) {
      navbar.classList.add("is-hidden");
    } else if (scrollDifference > 6) {
      navbar.classList.remove("is-hidden");
    }

    lastScroll = currentScroll;
  });
}

/* AD MARQUEE */
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

/* MOBILE MENU */
const menuOpenBtn = document.querySelector("[data-menu-open]");
const menuCloseBtn = document.querySelector("[data-menu-close]");
const menuBackdrop = document.querySelector("[data-menu-backdrop]");
const menuLinks = document.querySelectorAll(".mobile-menu-link");

function openMobileMenu() {
  if (!menuBackdrop) return;

  menuBackdrop.classList.add("is-open");
  document.body.classList.add("menu-lock");
}

function closeMobileMenu() {
  if (!menuBackdrop) return;

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

/* CONTACT FORM */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const fullName = contactForm.querySelector("#full-name");
  const email = contactForm.querySelector("#email");
  const phone = contactForm.querySelector("#phone");
  const message = contactForm.querySelector("#message");
  const privacy = contactForm.querySelector("#privacy");
  const botField = contactForm.querySelector('[name="bot-field"]');
  const privacyError = contactForm.querySelector(".privacy-error");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (input, message) => {
    const field = input.closest(".form-field");
    const error = field.querySelector(".form-error");

    field.classList.add("is-error");
    error.textContent = message;
  };

  const clearError = (input) => {
    const field = input.closest(".form-field");
    const error = field.querySelector(".form-error");

    field.classList.remove("is-error");
    error.textContent = "";
  };

  const validateInput = (input) => {
    const value = input.value.trim();

    if (value === "") {
      setError(input, "This field is required.");
      return false;
    }

    if (input.type === "email" && !emailPattern.test(value)) {
      setError(input, "Please enter a valid email address.");
      return false;
    }

    clearError(input);
    return true;
  };

  const validatePrivacy = () => {
    if (!privacy.checked) {
      privacyError.textContent = "Please accept the data privacy policy.";
      return false;
    }

    privacyError.textContent = "";
    return true;
  };

  [fullName, email, phone, message].forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
    });

    input.addEventListener("blur", () => {
      validateInput(input);
    });
  });

  privacy.addEventListener("change", validatePrivacy);

  contactForm.addEventListener("submit", (event) => {
    let isValid = true;

    if (botField && botField.value.trim() !== "") {
      event.preventDefault();
      return;
    }

    [fullName, email, phone, message].forEach((input) => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    if (!validatePrivacy()) {
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
      return;
    }

    alert(
      "Your message has been received. I’ll get back to you as soon as possible.",
    );
  });
}
