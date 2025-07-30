function filtrarProductos(categoria, event) {
  const productos = document.querySelectorAll('.producto');
  const botones = document.querySelectorAll('.menu-filtros button');

  // Quitar clase activa de todos los botones
  botones.forEach(btn => btn.classList.remove('activo'));
  if (event) event.target.classList.add('activo');

  productos.forEach(producto => {
    const esIngrediente = producto.classList.contains('ingredientes');

    if (categoria === 'todos') {
      // Mostrar todo excepto los ingredientes
      producto.style.display = esIngrediente ? 'none' : 'block';
    } 
    else if (categoria === 'ingredientes') {
      // Solo mostrar ingredientes
      producto.style.display = esIngrediente ? 'block' : 'none';
    } 
    else {
      // Mostrar solo los productos de la categoría seleccionada
      producto.style.display = producto.classList.contains(categoria) ? 'block' : 'none';
    }
  });
}


function agregarAlCarrito(productoId) {
  const producto = document.getElementById(productoId);
  const nombre = producto.querySelector('h3').textContent;
  const precio = producto.querySelector('.precio').textContent;

  console.log(`Agregando al carrito: ${nombre} - ${precio}`);
  // Aquí podrías guardarlo en localStorage o enviarlo a un servidor
}
function ampliarImagen(img) {
  const modal = document.getElementById("modal-imagen");
  const modalImg = document.getElementById("img-ampliada");

  modal.style.display = "block";
  modalImg.src = img.src;
}


// Al cargar la página, mostrar solo la categoría "todos"
window.addEventListener('DOMContentLoaded', () => {
  filtrarProductos('todos', null);
});




let carrito = [];
let total = 0;

function agregarAlCarrito(productoId) {
  const producto = document.getElementById(productoId);
  const nombre = producto.querySelector('h3').textContent;
  const precioTexto = producto.querySelector('.precio').textContent;
  const precio = parseFloat(precioTexto.replace('$', '').replace('.', ''));

  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');

  lista.innerHTML = '';
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button onclick="eliminarDelCarrito(${index})">X</button>
    `;
    lista.appendChild(li);
  });

  totalCarrito.textContent = `Total: $${total}`;
}

function eliminarDelCarrito(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  actualizarCarrito();
}

function abrirCarrito() {
  document.getElementById('modal-carrito').style.display = 'block';
}

function cerrarCarrito() {
  document.getElementById('modal-carrito').style.display = 'none';
}

function confirmarPedido() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  let mensaje = "Hola, quiero hacer un pedido:\n\n";
  carrito.forEach(item => {
    mensaje += `• ${item.nombre} - $${item.precio}\n`;
  });
  mensaje += `\nTotal: $${total}`;

  const telefono = "573126885055"; // Cambia a tu número
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  // Vaciar carrito y cerrar modal
  carrito = [];
  total = 0;
  actualizarCarrito();
  cerrarCarrito();

  // Abrir WhatsApp
  window.open(url, '_blank');
}
