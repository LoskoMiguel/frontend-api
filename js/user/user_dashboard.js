const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (!token || rol !== "user") {
  window.location.href = "/";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  window.location.href = "/";
});