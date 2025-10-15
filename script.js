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

// ==== LIGHTBOX GALERÍA CON FLECHAS ====
(function() {
  const galleryImages = document.querySelectorAll('#galeria .gallery-grid img');

  // Crear el lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button id="lb-close" aria-label="Cerrar imagen">✕</button>
    <button id="lb-prev" class="lightbox-arrow">&#10094;</button>
    <img src="" alt="">
    <button id="lb-next" class="lightbox-arrow">&#10095;</button>
  `;
  document.body.appendChild(lightbox);

  const imgTag = lightbox.querySelector('img');
  const btnClose = document.getElementById('lb-close');
  const btnPrev = document.getElementById('lb-prev');
  const btnNext = document.getElementById('lb-next');

  let currentIndex = 0;

  // Abrir lightbox al click en imagen
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      imgTag.src = img.src;
      imgTag.alt = img.alt || '';
      lightbox.classList.add('show');
    });
  });

  // Funciones navegación
  function showImage(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentIndex];
    imgTag.src = img.src;
    imgTag.alt = img.alt || '';
  }

  btnPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  btnNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // Cerrar lightbox
  function closeLightbox() {
    lightbox.classList.remove('show');
    imgTag.src = '';
  }

  btnClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') btnPrev.click();
    if (e.key === 'ArrowRight') btnNext.click();
  });
})();
