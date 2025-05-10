const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');
const rol = localStorage.getItem("rol");
const token = localStorage.getItem("token");

if (!token || rol !== "admin") {
  window.location.href = "/";
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const rol = document.getElementById('role').value;

  try {
    const res = await fetch("http://127.0.0.1:8000/admin/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name, username, password, rol })
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.detail || "Error al registrar usuario";
      return;
    }

    message.textContent = data.Mensaje;
  } catch (error) {
    console.error(error);
    message.textContent = "Error de conexión con el servidor.";
  }
});
