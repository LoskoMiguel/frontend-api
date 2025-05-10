const rol = localStorage.getItem("rol");
const token = localStorage.getItem("token");

let productos_temp = [];

if (!token || (rol !== "admin" && rol !== "user")) {
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
        const precios = data.precios;
        const select = document.getElementById('producto');

        productos.forEach((nombre, index) => {
            const option = document.createElement("option");
            option.value = nombre;
            option.textContent = `${nombre} - $${precios[index]}`;
            select.appendChild(option);
        });

        new Choices(select, {
            searchEnabled: true,
            itemSelectText: '',
            noResultsText: 'No se encontraron productos',
            shouldSort: false
        });

    } catch (error) {
        console.error("Error de conexión con el servidor:", error);
    }
});

function agregarProducto(e) {
    e.preventDefault();

    const nombre_producto = document.getElementById('producto').value;
    const cantidad_producto = parseInt(document.getElementById('cantidad').value);

    if (!nombre_producto || isNaN(cantidad_producto) || cantidad_producto <= 0) {
        alert("Selecciona un producto y una cantidad válida.");
        return;
    }

    const existente = productos_temp.find(p => p.product_name === nombre_producto);
    if (existente) {
        existente.quantity += cantidad_producto;
    } else {
        productos_temp.push({
            product_name: nombre_producto,
            quantity: cantidad_producto
        });
    }

    actualizarLista();
}

function eliminarProducto(index) {
    productos_temp.splice(index, 1);
    actualizarLista();
}

function actualizarLista() {
    const ul = document.getElementById("productosAgregados");
    ul.innerHTML = "";

    productos_temp.forEach((producto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.product_name} (x${producto.quantity})
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        ul.appendChild(li);
    });
}

async function agregarVenta(e) {
    e.preventDefault();

    const cliente = document.getElementById('cliente').value;
    const metodo = document.getElementById('metodoPago').value;

    if (!cliente || !metodo || productos_temp.length === 0) {
        alert("Debes llenar todos los campos y agregar al menos un producto.");
        return;
    }

    const venta = {
        customer_name: cliente,
        payment_method: metodo,
        products: productos_temp
    };

    try {
        const res = await fetch("http://127.0.0.1:8000/ventas/registrar_venta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(venta)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || "Error en el servidor");
        }

        document.getElementById("message").textContent = data.message;
        productos_temp = [];
        actualizarLista();
        document.getElementById("siguienteVentaBtn").style.display = "inline-block";
    } catch (error) {
        document.getElementById("message").textContent = "Error: " + error.message;
    }
}

async function sumarProducto(e) {
    e.preventDefault();

    try {
        const res = await fetch("http://127.0.0.1:8000/ventas/sumar_productos", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ products: productos_temp })
        });

        const data = await res.json();

        if (!res.ok) {
            const errorMessage = typeof data.detail === "string" 
                ? data.detail 
                : JSON.stringify(data.detail);
            throw new Error(errorMessage || "Error en el servidor");
        }

        document.getElementById("message").textContent = data.message;
    } catch (error) {
        document.getElementById("message").textContent = "Error: " + error.message;
    }
}