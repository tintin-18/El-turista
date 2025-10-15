// script.js

// búsqueda rápida de destinos
function doSearch() {
  const query = document.getElementById("q").value.trim().toLowerCase();
  const scope = document.getElementById("scope").value;
  const resultsDiv = document.getElementById("results");

  // Lista de destinos
  const destinations = [
    { name: "Punta del Este", type: "national" },
    { name: "Colonia del Sacramento", type: "national" },
    { name: "Rio de Janeiro", type: "international" }
  ];

  // Filtramos según el query y el scope
  let results;
  if (!query) {
    // Si no escribe nada, mostramos todos los destinos del scope seleccionado
    results = destinations.filter(dest => dest.type === scope);
  } else {
    results = destinations.filter(dest =>
      dest.name.toLowerCase().includes(query) && dest.type === scope
    );
  }

  // Mostrar resultados
  if (results.length > 0) {
    resultsDiv.innerHTML = "<ul>" + results.map(r => `<li>${r.name}</li>`).join("") + "</ul>";
  } else {
    resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
  }
}


// Abre la imagen en modal
function openModal(imgElement) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  modal.style.display = "flex";
  modalImg.src = imgElement.src;
}

// Cierra el modal si se hace clic fuera de la imagen
function closeModal(event) {
  const modal = document.getElementById("modal");
  if (event.target.id === "modal" || event.target.id === "modalImg") {
    modal.style.display = "none";
    document.getElementById("modalImg").src = "";
  }
}

// Envía el formulario de contacto (simulación)
function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Por favor, completá los campos obligatorios.");
    return;
  }

  // Simulación de envío — reemplazar con integración real (Formspree, EmailJS, backend propio, etc.)
  alert(`Gracias ${name}, recibimos tu mensaje: \n\n"${message}"`);

  // Resetea el formulario
  document.getElementById("contactForm").reset();
}
 // animation on scrolling
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('show');
      }, i * 300); // cada card entra 300ms después de la anterior
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

fadeElements.forEach(el => observer.observe(el));

// ==== LIGHTBOX CARRUSEL CON SWIPE ====
(function() {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="close-btn" aria-label="Cerrar">✕</button>
    <button class="prev-btn" aria-label="Anterior">‹</button>
    <button class="next-btn" aria-label="Siguiente">›</button>
    <img src="" alt="">
  `;
  document.body.appendChild(lightbox);

  const imgTag = lightbox.querySelector('img');
  const btnClose = lightbox.querySelector('.close-btn');
  const btnPrev = lightbox.querySelector('.prev-btn');
  const btnNext = lightbox.querySelector('.next-btn');

  // Todas las imágenes de la galería
  const galleryImgs = Array.from(document.querySelectorAll('#galeria .gallery-grid img'));
  let currentIndex = 0;

  function showLightbox(index) {
    currentIndex = index;
    imgTag.src = galleryImgs[currentIndex].dataset.full || galleryImgs[currentIndex].src;
    imgTag.alt = galleryImgs[currentIndex].alt || '';
    lightbox.classList.add('show');
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    imgTag.src = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
    imgTag.src = galleryImgs[currentIndex].dataset.full || galleryImgs[currentIndex].src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImgs.length;
    imgTag.src = galleryImgs[currentIndex].dataset.full || galleryImgs[currentIndex].src;
  }

  galleryImgs.forEach((img, i) => {
    img.addEventListener('click', () => showLightbox(i));
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', showPrev);
  btnNext.addEventListener('click', showNext);

  // Cerrar con Esc
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') showPrev();
    if(e.key === 'ArrowRight') showNext();
  });

  // Swipe móvil
  let startX = 0;
  imgTag.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  imgTag.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if(endX - startX > 50) showPrev();   // swipe derecha
    if(startX - endX > 50) showNext();   // swipe izquierda
  });

  // Clic fuera de la imagen cierra
  lightbox.addEventListener('click', e => {
    if(e.target === lightbox) closeLightbox();
  });

})();
