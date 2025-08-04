let carrito = [];
let total = 0;
let tipoPedido = null;

// ✅ Filtro de productos por categoría
function filtrarProductos(categoria, event) {
  const productos = document.querySelectorAll('.producto');
  const botones = document.querySelectorAll('.menu-filtros button');

  botones.forEach(btn => btn.classList.remove('activo'));
  if (event) event.target.classList.add('activo');

  productos.forEach(producto => {
    const esIngrediente = producto.classList.contains('ingredientes');
    const esArmaTuPerro = producto.classList.contains('arma-tu-perro');

    if (categoria === 'todos') {
      producto.style.display = esIngrediente || esArmaTuPerro ? 'none' : 'block';
    } else if (categoria === 'ingredientes') {
      producto.style.display = esIngrediente ? 'block' : 'none';
    } else {
      producto.style.display = producto.classList.contains(categoria) ? 'block' : 'none';
    }
  });
}

// ✅ Agrega al carrito con animación
function agregarAlCarrito(productoId) {
  const producto = document.getElementById(productoId);
  const nombre = producto.querySelector('h3').textContent;
  const precioTexto = producto.querySelector('.precio').textContent;
  const precio = parseFloat(precioTexto.replace('$', '').replace('.', ''));

  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();

  const boton = producto.querySelector('button');
  boton.classList.add('agregado');
  boton.disabled = true;
  setTimeout(() => {
    boton.classList.remove('agregado');
    boton.disabled = false;
  }, 1500);
}

// ✅ Actualiza la visual del carrito
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

// ✅ Elimina un producto del carrito
function eliminarDelCarrito(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  actualizarCarrito();
}

// ✅ Mostrar modal del carrito
function abrirCarrito() {
  document.getElementById('modal-carrito').style.display = 'block';
}

// ✅ Ocultar modal
function cerrarCarrito() {
  document.getElementById('modal-carrito').style.display = 'none';
}

// ✅ Selección de tipo de pedido (puesto o domicilio)
function seleccionarTipoPedido(tipo) {
  tipoPedido = tipo;
  document.getElementById('formulario-puesto').style.display = tipo === 'puesto' ? 'block' : 'none';
  document.getElementById('formulario-domicilio').style.display = tipo === 'domicilio' ? 'block' : 'none';
}

// ✅ Confirmar y enviar a WhatsApp
function confirmarPedido() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  if (!tipoPedido) {
    alert("Selecciona si estás en el Puesto o si es Domicilio.");
    return;
  }

  let mensaje = "🧾 *Pedido CRAZY DOG:*\n";
  carrito.forEach(item => {
    mensaje += `• ${item.nombre} - $${item.precio}\n`;
  });
  mensaje += `\n*Total:* $${total}\n`;

  if (tipoPedido === 'puesto') {
    const nombre = document.getElementById('nombrePuesto').value.trim();
    if (!nombre) return alert("Ingresa tu nombre.");
    mensaje += `\n📍 *Lugar:* Puesto Perroloco\n🙋 *Nombre:* ${nombre}`;
  } else {
    const telefono = document.getElementById('telefono').value.trim();
    const nombre = document.getElementById('nombreDomicilio').value.trim();
    const carrera = document.getElementById('carrera').value.trim();
    const bloque = document.getElementById('bloque').value.trim();

    if (!telefono || !nombre || !carrera || !bloque)
      return alert("Completa todos los campos del formulario.");

    mensaje += `\n📍 *Lugar:* Domicilio\n📞 *Teléfono:* ${telefono}\n🙋 *Nombre:* ${nombre}\n📌 *Dirección:* Carrera ${carrera}, Bloque ${bloque}`;
  }

  const telefonoDestino = "573126885055";
  const url = `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(mensaje)}`;

  // Limpiar todo
  carrito = [];
  total = 0;
  tipoPedido = null;
  actualizarCarrito();
  cerrarCarrito();

  document.querySelectorAll('.formulario-condicional input').forEach(input => input.value = '');
  document.getElementById('formulario-puesto').style.display = 'none';
  document.getElementById('formulario-domicilio').style.display = 'none';

  window.open(url, '_blank');
}

// ✅ Imagen ampliada (opcional)
function ampliarImagen(img) {
  const modal = document.getElementById("modal-imagen");
  const modalImg = document.getElementById("img-ampliada");
  modal.style.display = "block";
  modalImg.src = img.src;
}

// ✅ Mostrar categoría "todos" al cargar
window.addEventListener('DOMContentLoaded', () => {
  filtrarProductos('todos', null);
});
