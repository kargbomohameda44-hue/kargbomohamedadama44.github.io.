const $ = (selector) => document.querySelector(selector);
const nav = $("#mainNav");
const menuToggle = $("#menuToggle");
const modal = $("#authModal");
const authTitle = $("#authTitle");
const authDescription = $("#authDescription");
const authSubmit = $("#authSubmit");
const authStatus = $("#authStatus");
const switchAuth = $("#switchAuth");
let authMode = "login";

$("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

function openAuth(mode) {
  authMode = mode;
  authTitle.textContent = mode === "login" ? "Welcome back" : "Create your account";
  authDescription.textContent = mode === "login"
    ? "Sign-in is a preview until secure authentication is connected."
    : "Registration is a preview until secure authentication is connected.";
  authSubmit.textContent = mode === "login" ? "Log in" : "Create account";
  switchAuth.textContent = mode === "login" ? "Need an account? Register" : "Already registered? Log in";
  authStatus.textContent = "Demo only: do not enter a real password.";
  modal.hidden = false;
  $("#authEmail").focus();
}
$("#loginOpen").addEventListener("click", () => openAuth("login"));
$("#registerOpen").addEventListener("click", () => openAuth("register"));
$("#modalClose").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", event => { if (event.target === modal) modal.hidden = true; });
document.addEventListener("keydown", event => { if (event.key === "Escape") modal.hidden = true; });
switchAuth.addEventListener("click", () => openAuth(authMode === "login" ? "register" : "login"));
$("#authForm").addEventListener("submit", event => {
  event.preventDefault();
  authStatus.textContent = "This is only a visual demo. Connect Supabase Auth before accepting real accounts.";
});

$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Vision SL enquiry: ${data.get("topic")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nTopic: ${data.get("topic")}\n\n${data.get("message")}`
  );
  $("#contactStatus").textContent = "Your email app may open with a draft. This form does not send or store data by itself.";
  // Uses the visitor's configured email app; change this address before launch.
  window.location.href = `mailto:hello@visionsl.com?subject=${subject}&body=${body}`;
});
