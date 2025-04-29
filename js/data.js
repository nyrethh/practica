// Inicialización de Firebase (ya está en tu HTML)
const db = firebase.database();
const atajosRef = db.ref('atajos');

// Elementos del DOM
const tableBody = document.querySelector("#shortcutsTable tbody");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Normalizar texto (ignora acentos y mayúsculas)
const normalizeText = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Renderizar tabla
const renderTable = (data) => {
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
};

// Cargar datos desde Firebase
const cargarAtajos = () => {
  atajosRef.on('value', (snapshot) => {
    const atajos = [];
    snapshot.forEach((childSnapshot) => {
      atajos.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    renderTable(atajos);
  });
};

// Eliminar atajo
const eliminarAtajo = (id) => {
  if (confirm("¿Eliminar este atajo?")) {
    atajosRef.child(id).remove()
      .catch(error => console.error("Error al eliminar:", error));
  }
};

// Eventos
searchInput.addEventListener("input", cargarAtajos);
categoryFilter.addEventListener("change", cargarAtajos);
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    eliminarAtajo(e.target.getAttribute('data-id'));
  }
});

// Iniciar
cargarAtajos();