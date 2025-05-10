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

    const name_product_edit = document.getElementById('productSelect').value;
    const new_name_product = document.getElementById('newName').value.trim();
    const new_price_product = document.getElementById('newPrice').value;
    const new_stock_product = document.getElementById('newStock').value;
    const new_description_product = document.getElementById('newDescription').value.trim();

    if (!name_product_edit) {
        message.textContent = "Debes seleccionar un producto.";
        return;
    }

    const payload = { name_product_edit };

    if (new_name_product !== "") payload.new_name_product = new_name_product;
    if (new_price_product !== "") payload.new_price_product = parseFloat(new_price_product);
    if (new_stock_product !== "") payload.new_stock_product = parseInt(new_stock_product);
    if (new_description_product !== "") payload.new_description_product = new_description_product;

    try {
        const res = await fetch("http://127.0.0.1:8000/admin/productos/editar_producto", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            message.textContent = data.detail || "Error al editar el producto";
            return;
        }

        message.textContent = data.mensaje || "Producto editado correctamente";
    } catch (error) {
        console.error(error);
        message.textContent = "Error de conexión con el servidor.";
    }
});
