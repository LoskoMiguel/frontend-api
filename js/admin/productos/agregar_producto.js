const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');
const rol = localStorage.getItem("rol");
const token = localStorage.getItem("token");

if (!token || rol !== "admin") {
  window.location.href = "/";
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

  const name_product = document.getElementById('productName').value;
  const price = document.getElementById('priceProduct').value;
  const stock = document.getElementById('stockProduct').value;
  const description = document.getElementById('productDescription').value;

  try {
    const res = await fetch("http://127.0.0.1:8000/admin/productos/agregar_producto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name_product, price, stock, description })
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.detail || "Error al registrar el producto";
      message.classList.remove('success');
      message.style.display = 'block';
      return;
    }
    
    message.textContent = data.Mensaje;
    message.classList.add('success');
    
  } catch (error) {
    console.error(error);
    message.textContent = "Error de conexión con el servidor.";
  }
});