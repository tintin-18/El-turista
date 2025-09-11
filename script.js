// script.js

// Simula una búsqueda rápida de destinos
function doSearch() {
  const query = document.getElementById("q").value.trim();
  const scope = document.getElementById("scope").value;

  if (!query) {
    alert("Por favor, escribí un destino para buscar.");
    return;
  }

  alert(`Buscando viajes a "${query}" (${scope === "national" ? "Nacional" : "Internacional"})...`);
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
