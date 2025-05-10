const searchInput = document.getElementById('searchInput');
const productsContainer = document.getElementById('productsContainer');
let productos = [];
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

        productos = data.nombres.map((nombre, i) => ({
            nombre: nombre,
            precio: data.precios[i],
            descripcion: data.descripciones[i],
            total : data.total[i]
        }));

        renderProductos(productos);

    } catch (error) {
        console.error("Error de conexión con el servidor:", error);
    }
});

searchInput.addEventListener('input', () => {
    const filtro = searchInput.value.toLowerCase();
    const filtrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(filtro)
    );
    renderProductos(filtrados);
});

function renderProductos(lista) {
    productsContainer.innerHTML = "";

    lista.forEach(producto => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-name">${producto.nombre}</div>
            <div class="product-price">Precio: $${producto.precio}</div>
            <div class="product-description">Descripcion: ${producto.descripcion}</div>
            <div class="product-total">${producto.total}</div>
        `;

        productsContainer.appendChild(card);
    });
}
