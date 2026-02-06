/* ---------------- Demo credentials (CHANGE FOR REAL USE) ---------------- */
const DEMO_USER = "admin";
const DEMO_PASS = "password123";
const STORAGE_KEY = "my_panel_auth";

/* ---------------- Helper / Theme ---------------- */
function setTheme(type) {
  if (type === "dark") {
    document.body.style.background = "linear-gradient(135deg, #020617, #020617)";
  } else {
    // default purple
    document.body.style.background = "linear-gradient(135deg, #2b2f8f, #14163c)";
  }
}

/* ---------------- AUTH functions ---------------- */
function showError(message) {
  const el = document.getElementById("loginError");
  el.innerText = message;
  el.style.display = "block";
}

function hideError() {
  const el = document.getElementById("loginError");
  el.style.display = "none";
}

/* Called when login button pressed */
function login() {
  hideError();
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  // Demo check (replace with server request in production)
  if (user === DEMO_USER && pass === DEMO_PASS) {
    const token = btoa(`${user}:${Date.now()}`); // demo token
    if (remember) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      sessionStorage.setItem(STORAGE_KEY, token);
    }
    onLoginSuccess(user);
  } else {
    showError("Invalid credentials. Use admin / password123 (demo).");
  }
}

/* Show main UI and hide login overlay */
function onLoginSuccess(user) {
  document.getElementById("loginOverlay").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("welcomeTxt").innerText = `Welcome, ${user}!`;
  setTheme("purple");
}

/* Logout */
function logout() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  // show login again
  document.getElementById("loginOverlay").style.display = "flex";
  document.getElementById("app").style.display = "none";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

/* Check saved auth on page load */
function checkAuthOnLoad() {
  const token = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
  if (token) {
    // in demo we don't decode token, just accept it as logged in
    onLoginSuccess(DEMO_USER);
  } else {
    // show login overlay
    document.getElementById("loginOverlay").style.display = "flex";
    document.getElementById("app").style.display = "none";
  }
}

/* Attach events */
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLogin").addEventListener("click", login);
  document.getElementById("btnLogout").addEventListener("click", logout);

  // allow Enter key on password field
  document.getElementById("password").addEventListener("keyup", (e) => {
    if (e.key === "Enter") login();
  });

  checkAuthOnLoad();
});
