// Referencias a elementos del DOM
const tableBody = document.querySelector("#shortcutsTable tbody");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Inicialización de Firebase
//const db = firebase.database();
//const atajosRef = db.ref('atajos');
const atajosRef = firebase.database().ref('atajos');


// Normalizar texto para búsquedas
function normalizeText(text) {
  return text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n");
}

// Renderizar tabla con datos de Firebase
function renderTable(data) {
  const searchTerm = normalizeText(searchInput.value);
  const selectedCategory = categoryFilter.value;

  const filteredData = data.filter(row => {
    const matchText = normalizeText(row.comando + row.accion).includes(searchTerm);
    const matchCategory = !selectedCategory || row.categoria === selectedCategory;
    return matchText && matchCategory;
  });

  tableBody.innerHTML = filteredData.map(row => `
    <tr>
      <td>${row.comando}</td>
      <td>${row.accion}</td>
      <td>${row.categoria}</td>
      <td class="actions">
        <button class="btn-edit" data-id="${row.id}">✏️</button>
        <button class="btn-delete" data-id="${row.id}">🗑️</button>
      </td>
    </tr>
  `).join('');
}

// Cargar atajos desde Firebase
function cargarAtajos() {
  atajosRef.on('value', (snapshot) => {
    const atajos = [];
    snapshot.forEach((childSnapshot) => {
      atajos.push({
        id: childSnapshot.key,  // ID de Firebase
        ...childSnapshot.val()   // Datos del atajo
      });
    });
    renderTable(atajos);
  });
}

// Eliminar atajo
function eliminarAtajo(id) {
  if (confirm("¿Eliminar este atajo permanentemente?")) {
    atajosRef.child(id).remove()
      .then(() => console.log("Atajo eliminado"))
      .catch(error => console.error("Error:", error));
  }
}

// Event Listeners
searchInput.addEventListener("input", () => cargarAtajos());
categoryFilter.addEventListener("change", () => cargarAtajos());
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    const id = e.target.getAttribute('data-id');
    eliminarAtajo(id);
  }
});

// Iniciar
cargarAtajos();