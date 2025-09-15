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
