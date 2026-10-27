const header = document.querySelector(".site-header");
const nav = document.querySelector("#site-nav");
const toggle = document.querySelector(".nav-toggle");
const form = document.querySelector("#contact-form");
const statusEl = document.querySelector("#form-status");

const setScrolled = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

setScrolled();
window.addEventListener("scroll", setScrolled, { passive: true });

const closeNav = () => {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "메뉴 열기");
};

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
  nav.classList.toggle("is-open", !open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusEl.classList.remove("is-error");

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  const fields = {
    name: name.length >= 2,
    email: emailPattern.test(email),
    message: message.length >= 10,
  };

  Object.entries(fields).forEach(([key, valid]) => {
    form.querySelector(`[name="${key}"]`).closest(".field").classList.toggle("is-invalid", !valid);
  });

  if (!Object.values(fields).every(Boolean)) {
    statusEl.textContent = "이름, 이메일, 메시지를 다시 확인해 주세요.";
    statusEl.classList.add("is-error");
    return;
  }

  form.reset();
  form.querySelectorAll(".field").forEach((field) => field.classList.remove("is-invalid"));
  statusEl.textContent = "메시지를 받았습니다. 곧 답장드릴게요.";
});
