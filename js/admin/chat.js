const form = document.getElementById("chatForm");
const mensajeInput = document.getElementById("mensaje");
const respuestaDiv = document.getElementById("respuesta");
const rol = localStorage.getItem("rol");
const token = localStorage.getItem("token");

if (!token || rol !== "admin") {
  window.location.href = "/";
}


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const mensaje = mensajeInput.value.trim();
    if (!mensaje) return;

    respuestaDiv.innerHTML = "Cargando respuesta...";

    try {
        const res = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ user_message: mensaje })
        });

        const data = await res.json();

        if (!res.ok) {
            respuestaDiv.innerHTML = `<p style="color:red;">Error: ${data.detail || "Algo salió mal."}</p>`;
            return;
        }

        respuestaDiv.innerHTML = data.response;

    } catch (err) {
        console.error(err);
        respuestaDiv.innerHTML = `<p style="color:red;">Error de conexión con el servidor.</p>`;
    }
});