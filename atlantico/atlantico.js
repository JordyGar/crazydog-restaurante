function filtrarProductos(categoria) {
  const productos = document.querySelectorAll('.producto');
  const botones = document.querySelectorAll('.menu-filtros button');

  // Actualiza clase activa en los botones
  botones.forEach(btn => btn.classList.remove('activo'));
  event.target.classList.add('activo');

  productos.forEach(producto => {
    if (categoria === 'todos') {
      producto.style.display = 'block';
    } else {
      producto.classList.contains(categoria)
        ? producto.style.display = 'block'
        : producto.style.display = 'none';
    }
  });
}
//funcion para agregar al carrito 
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

function cerrarModal() {
  document.getElementById("modal-imagen").style.display = "none";
}
