const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');
const rol = localStorage.getItem("rol");
const token = localStorage.getItem("token");

if (!token || rol !== "admin") {
  window.location.href = "/";
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch("http://127.0.0.1:8000/productos/mostrar_productos");
        const data = await res.json();

        if (!res.ok) {
            console.error("Error al obtener productos:", data.detail);
            return;
        }

        const productos = data.nombres;
        const select = document.getElementById('productSelect');

        productos.forEach(nombre => {
            const option = document.createElement("option");
            option.value = nombre;
            option.textContent = nombre;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error de conexión con el servidor:", error);
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name_product = document.getElementById('productSelect').value;

    if (!name_product) {
        message.textContent = "Debes seleccionar un producto";
        return;
    }

    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el producto "${name_product}"? Esta acción no se puede deshacer.`);

    if (!confirmar) {
        message.textContent = "Eliminación cancelada por el usuario.";
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:8000/admin/productos/eliminar_producto", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name_product })
        });

        const data = await res.json();

        if (!res.ok) {
            message.textContent = data.detail || "Error al eliminar el producto";
            return;
        }

        message.textContent = data.mensaje || "Producto eliminado correctamente";
    } catch (error) {
        console.error(error);
        message.textContent = "Error de conexión con el servidor.";
    }
});
