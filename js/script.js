document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".navbar");
  header.classList.add("sticky");

  const navigation = document.getElementById("navMenu");
  const burgerBar = document.getElementById("burgerBar");

  const overlay = document.createElement("div");
  overlay.className = "overlay hidden";
  document.body.appendChild(overlay);

  burgerBar?.addEventListener("click", () => {
    navigation.classList.toggle("activeNav");
    overlay.classList.toggle("hidden");
  });

  overlay?.addEventListener("click", () => {
    navigation.classList.remove("activeNav");
    overlay.classList.add("hidden");
  });

  function closeMenu() {
    navigation.classList.remove("activeNav");
    overlay.classList.add("hidden");
  }

  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    toggle?.addEventListener("click", e => {
      e.preventDefault();
      dropdown.classList.toggle("active");
    });
  });

  document.addEventListener("click", e => {
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector(".dropdown-toggle");
      if (!dropdown.contains(e.target) && e.target !== toggle) {
        dropdown.classList.remove("active");
      }
    });
  });

  const tabs = document.querySelectorAll(".category-tabs li");
  const cards = document.querySelectorAll(".course-card");

  function showAllMenu() {
    cards.forEach(card => {
      card.style.display = "block";
      setTimeout(() => card.style.opacity = "1", 20);
    });
    tabs.forEach(tab => tab.classList.remove("active"));
  }

  showAllMenu();

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter;
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      cards.forEach(card => {
        if (card.classList.contains(filter)) {
          card.style.display = "block";
          setTimeout(() => (card.style.opacity = "1"), 20);
        } else {
          card.style.opacity = "0";
          setTimeout(() => (card.style.display = "none"), 300);
        }
      });
    });
  });

  document.querySelectorAll(".dropdown-menu li").forEach(item => {
    item.addEventListener("click", () => {
      const filter = item.dataset.filter;
      document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });

      cards.forEach(card => {
        if (card.classList.contains(filter)) {
          card.style.display = "block";
          setTimeout(() => (card.style.opacity = "1"), 20);
        } else {
          card.style.opacity = "0";
          setTimeout(() => (card.style.display = "none"), 300);
        }
      });

      dropdowns.forEach(d => d.classList.remove("active"));
      closeMenu();
    });
  });

  document.querySelectorAll('a[href="#categories"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showAllMenu();
      document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    });
  });

  const logo = document.getElementById("logo");
  logo?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  });

  const mobileLogo = document.getElementById("mobileLogo");
  mobileLogo?.addEventListener("click", () => {
    document.querySelector(".main")?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  });

  const loginSection = document.querySelector(".login");
  const loginForm = loginSection?.querySelector("form") || loginSection;
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  togglePassword?.addEventListener("click", () => {
    if (!passwordInput) return;
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.textContent = type === "password" ? "Show" : "Hide";
  });

  loginForm?.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value) {
      emailError.textContent = "Email is required";
      valid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = "Enter a valid email address";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordInput.value) {
      passwordError.textContent = "Password is required";
      valid = false;
    } else if (!passwordRegex.test(passwordInput.value)) {
      passwordError.textContent = "Password must be at least 6 chars, with letters & numbers";
      valid = false;
    } else {
      passwordError.textContent = "";
    }

    if (valid) {
      alert("Login successful!");
      loginForm.reset();
      passwordInput.type = "password";
      togglePassword.textContent = "Show";
    }
  });

  emailInput?.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.textContent = emailRegex.test(emailInput.value) ? "" : "Enter a valid email address";
  });

  passwordInput?.addEventListener("input", () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    passwordError.textContent = passwordRegex.test(passwordInput.value) ? "" : "Password must be at least 6 chars, with letters & numbers";
  });

  const signInBtns = document.querySelectorAll('a[href="#signin"], a[href="#login"], .btn-nav, .sign-in'); 
  signInBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      closeMenu();
      loginSection?.scrollIntoView({ behavior: "smooth" });
    });
  });

  const newsletterForm = document.getElementById("contactForm");
  const newsletterEmail = document.getElementById("contactEmail");

  newsletterForm?.addEventListener("submit", e => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.value || !emailRegex.test(newsletterEmail.value)) {
      alert("Please enter a valid email");
      return;
    }
    alert("Subscribed successfully!");
    newsletterForm.reset();
  });

  const cookiesPopup = document.querySelector(".cookies-popup");
  const cookiesBtn = document.getElementById("acceptCookies");

  if (!localStorage.getItem("cookiesAccepted")) {
    cookiesPopup?.classList.remove("hidden");
  }

  cookiesBtn?.addEventListener("click", () => {
    cookiesPopup?.classList.add("hidden");
    localStorage.setItem("cookiesAccepted", "true");
  });
});

const testimonialsContainer = document.getElementById("testimonialsContainer");

fetch("https://randomuser.me/api/?results=4&nat=us")
  .then(response => response.json())
  .then(data => {
    const users = data.results;
    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("testimonial-card");

      const fullName = `${user.name.first} ${user.name.last}`;
      const img = user.picture.medium;
      const comment = getRandomComment();
      const stars = "⭐⭐⭐⭐⭐";

      card.innerHTML = `
        <img src="${img}" alt="User ${fullName}" class="testimonial-avatar">
        <p class="testimonial-text">"${comment}"</p>
        <h4 class="testimonial-name">— ${fullName}</h4>
        <span class="testimonial-stars">${stars}</span>
      `;

      testimonialsContainer.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error fetching testimonials:", err);
    testimonialsContainer.innerHTML = "<p>Unable to load testimonials right now.</p>";
  });

function getRandomComment() {
  const comments = [
    "FastBite is amazing! The food arrives hot and fresh every time!",
    "I love the variety of burgers — best in town!",
    "Quick delivery, tasty food and great service!",
    "Easy to order and always delicious!",
    "Best fast food experience I've had in a long time!"
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}
