const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const form = document.querySelector("[data-contact-form]");
const statusEl = document.querySelector("[data-form-status]");
const yearEl = document.querySelector("[data-year]");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const setNavOpen = (open) => {
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.querySelector(".sr-only").textContent = open ? "메뉴 닫기" : "메뉴 열기";
};

navToggle.addEventListener("click", () => {
  setNavOpen(!nav.classList.contains("is-open"));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

const validators = {
  name: (value) => (value.trim().length >= 2 ? "" : "이름을 두 글자 이상 입력해 주세요."),
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ? ""
      : "올바른 이메일 주소를 입력해 주세요.",
  message: (value) =>
    value.trim().length >= 10 ? "" : "메시지를 10자 이상 작성해 주세요.",
};

const showError = (field, message) => {
  const errorEl = form.querySelector(`[data-error-for="${field}"]`);
  if (errorEl) errorEl.textContent = message;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusEl.textContent = "";
  statusEl.classList.remove("is-success");

  const data = new FormData(form);
  let valid = true;

  Object.keys(validators).forEach((field) => {
    const message = validators[field](String(data.get(field) || ""));
    showError(field, message);
    if (message) valid = false;
  });

  if (!valid) {
    statusEl.textContent = "입력 내용을 다시 확인해 주세요.";
    return;
  }

  form.reset();
  Object.keys(validators).forEach((field) => showError(field, ""));
  statusEl.classList.add("is-success");
  statusEl.textContent = "메시지를 확인했습니다. 곧 연락드릴게요.";
});
