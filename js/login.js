const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.detail || "Error al iniciar sesión";
      return;
    }

    const token = data.token;
    const decoded = parseJwt(token);

    if (!decoded || !decoded.role) {
      message.textContent = "No se pudo leer el rol del token.";
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("rol", decoded.role);

    const role = decoded.role.toLowerCase();
    if (role === "admin") {
      window.location.href = "../html/admin/admin_dashboard.html";
    } else if (role === "user") {
      window.location.href = "../html/user/user_dashboard.html";
    } else {
      message.textContent = "Rol desconocido.";
    }

  } catch (error) {
    console.error(error);
    message.textContent = "Error de conexión con el servidor.";
  }
});