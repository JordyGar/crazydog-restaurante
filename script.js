// Animación de aparición
const buttons = document.querySelectorAll('.locations button');

buttons.forEach((btn, index) => {
  setTimeout(() => {
    btn.classList.add('animate');
  }, 200 * index);
});

// Rebote y redirección
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.add('clicked');
    
    setTimeout(() => {
      btn.classList.remove('clicked');
      const link = btn.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    }, 300); // Espera a que termine la animación
  });
});
