
  // Configuración de Firebase (DEBE ser idéntica a la de index.html)
  const firebaseConfig = {
    apiKey: "AIzaSyBAMDyqsF86K4w8UBxF4H8G7ctHocelMEUE",
    authDomain: "estudio-7423e.firebaseapp.com",
    databaseURL: "https://estudio-7423e-default-rtdb.firebaseio.com",
    projectId: "estudio-7423e",
    storageBucket: "estudio-7423e.appspot.com",
    messagingSenderId: "573139133856",
    appId: "1:573139133856:web:0448e72ec4758ee48db0c5"
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const atajosRef = db.ref('atajos');

  // Referencias a elementos del formulario
  const formAtajo = document.getElementById('formAtajo');
  const inputComando = document.getElementById('inputComando');
  const inputAccion = document.getElementById('inputAccion');
  const selectCategoria = document.getElementById('selectCategoria');
  const atajoIdInput = document.getElementById('atajoId');
  const btnSubmit = document.getElementById('btn-submit');
  const btnCancel = document.getElementById('btn-cancel');

  // Guardar o actualizar atajo
  formAtajo.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nuevoAtajo = {
      comando: inputComando.value,
      accion: inputAccion.value,
      categoria: selectCategoria.value
    };

    if (!nuevoAtajo.comando || !nuevoAtajo.accion || !nuevoAtajo.categoria) {
      alert("¡Todos los campos son obligatorios!");
      return;
    }



formAtajo.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nuevoAtajo = {
    comando: inputComando.value,
    accion: inputAccion.value,
    categoria: selectCategoria.value
  };

  if (!nuevoAtajo.comando || !nuevoAtajo.accion || !nuevoAtajo.categoria) {
    alert("¡Todos los campos son obligatorios!");
    return;
  }

 // Guardar en Firebase y redirigir
 atajosRef.push(nuevoAtajo)
 .then(() => {
   alert("¡Atajo guardado correctamente!");
   window.location.href = "index.html"; //Redirigiral listado principal
 })
 .catch((error) => {
   alert("Error al guardar: " + error.message);
 });
});


  });

  // Botón Cancelar
  btnCancel.addEventListener('click', () => {
    window.location.href = "index.html"; // Redirigir al listado
  });
