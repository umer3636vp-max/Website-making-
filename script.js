function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (u === "admin" && p === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").classList.remove("hidden");
  }
}
