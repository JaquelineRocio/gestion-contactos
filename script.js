// Selecciona el elemento con el id "app" del DOM para agregar otros elementos dinámicamente.
const app = document.querySelector("#app");

// Selecciona el botón para agregar contactos y la lista donde se mostrarán los contactos.
const boton = document.querySelector("#addContact");
const contactList = document.querySelector("#contactList");

// Carga los contactos almacenados en localStorage, si existen, o inicializa un arreglo vacío si no hay contactos guardados.
const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

// Crea un contenedor para mostrar la cantidad de contactos y un botón para ordenar los contactos.
const contadorContainer = document.createElement("div");
const sortButton = document.createElement("button");

// Añade el contenedor del contador y el botón de ordenación al DOM dentro del elemento "app".
app.appendChild(contadorContainer);
app.appendChild(sortButton);

// Muestra la cantidad inicial de contactos.
contadorContainer.innerText = `Cantidad de contactos: ${contactos.length}`;

// Define el texto del botón de ordenación.
sortButton.innerText = "Ordenar alfabéticamente";

// Añade un evento al botón de ordenación que llama a la función para ordenar los contactos cuando se hace clic.
sortButton.addEventListener("click", ordenarContactos);

// Función para actualizar el contador de contactos en el DOM.
function actualizarContador() {
  contadorContainer.innerText = `Cantidad de contactos: ${contactos.length}`;
}

// Función para guardar la lista de contactos en localStorage.
function guardarContactos() {
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

// Función para renderizar la lista de contactos en el DOM.
function renderContactList() {
  contactList.innerHTML = ""; // Limpia la lista actual para evitar duplicados.
  contactos.forEach((contacto) => {
    // Crea un nuevo elemento de lista para cada contacto.
    const li = document.createElement("li");
    li.className = "contact-item";

    // Crea un input para mostrar el nombre del contacto, que está deshabilitado por defecto.
    const inputContactName = document.createElement("input");
    inputContactName.value = contacto;
    inputContactName.disabled = true;
    li.appendChild(inputContactName);

    // Crea un botón para eliminar el contacto y añade un evento de clic para eliminarlo.
    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Eliminar";
    buttonDelete.className = "button-delete";
    buttonDelete.addEventListener("click", eliminarElemento);
    li.appendChild(buttonDelete);

    // Crea un botón para editar el contacto y añade un evento de clic para actualizarlo.
    const buttonEdit = document.createElement("button");
    buttonEdit.innerText = "Actualizar";
    buttonEdit.className = "button-edit";
    buttonEdit.addEventListener("click", actualizarElemento);
    li.appendChild(buttonEdit);

    // Añade el elemento de lista (li) al contenedor de la lista de contactos.
    contactList.appendChild(li);
  });
}

// Añade un evento de clic al botón de agregar contacto.
boton.addEventListener("click", () => {
  // Obtiene el valor del input de nombre de contacto y lo limpia de espacios en blanco.
  let inputValue = document.querySelector("#contactName").value.trim();

  // Verifica si el contacto ya existe en la lista.
  const existeContacto = contactos.indexOf(inputValue);

  // Si el campo está vacío, muestra una alerta y detiene la función.
  if (inputValue === "") {
    alert("El campo no puede estar vacío ni contener solo espacios.");
    return false;
    // Si el contacto ya existe, muestra una alerta y detiene la función.
  } else if (existeContacto !== -1) {
    alert("No puede agregar contactos repetidos");
    return false;
  } else {
    // Si el contacto es válido, lo agrega a la lista de contactos.
    contactos.push(inputValue);

    // Guarda los contactos en localStorage.
    guardarContactos();

    // Vuelve a renderizar la lista de contactos en el DOM.
    renderContactList();

    // Actualiza el contador de contactos.
    actualizarContador();
  }
});

// Función para eliminar un contacto de la lista.
function eliminarElemento(event) {
  const boton = event.target; // Obtiene el botón que se hizo clic.
  const li = boton.parentElement; // Obtiene el elemento de lista (li) padre del botón.
  const index = Array.from(contactList.children).indexOf(li); // Obtiene el índice del contacto en la lista.

  if (index > -1) {
    contactos.splice(index, 1); // Elimina el contacto de la lista de contactos.
    guardarContactos(); // Guarda la lista actualizada en localStorage.
  }

  renderContactList(); // Vuelve a renderizar la lista de contactos.
  actualizarContador(); // Actualiza el contador de contactos.
}

// Función para actualizar un contacto.
function actualizarElemento(event) {
  const boton = event.target; // Obtiene el botón que se hizo clic.
  const li = boton.parentElement; // Obtiene el elemento de lista (li) padre del botón.
  const inputContactName = li.querySelector("input"); // Obtiene el input dentro del elemento de lista.
  const buttonEdit = li.querySelector(".button-edit"); // Obtiene el botón de editar.

  // Si el botón dice "Actualizar", habilita el input para edición y cambia el texto del botón a "Guardar".
  if (buttonEdit.innerText === "Actualizar") {
    inputContactName.disabled = false;
    buttonEdit.innerText = "Guardar";
  } else {
    let inputValue = inputContactName.value.trim(); // Obtiene el valor del input limpio de espacios.

    const existeContacto = contactos.indexOf(inputValue); // Verifica si el nuevo nombre ya existe.

    if (inputValue.trim() === "") {
      alert("El campo no puede estar vacío ni contener solo espacios.");
      return false;
    } else if (
      existeContacto !== -1 &&
      existeContacto !== Array.from(contactList.children).indexOf(li)
    ) {
      alert("No puede agregar contactos repetidos");
      return false;
    } else {
      const index = Array.from(contactList.children).indexOf(li); // Obtiene el índice del contacto en la lista.
      contactos[index] = inputValue; // Actualiza el contacto en la lista de contactos.
      guardarContactos(); // Guarda la lista actualizada en localStorage.
      inputContactName.disabled = true; // Deshabilita el input para evitar más ediciones.
      buttonEdit.innerText = "Actualizar"; // Cambia el texto del botón a "Actualizar".
    }
  }
}

// Función para ordenar los contactos alfabéticamente.
function ordenarContactos() {
  contactos.sort((a, b) => a.localeCompare(b)); // Ordena los contactos alfabéticamente.
  guardarContactos(); // Guarda la lista ordenada en localStorage.
  renderContactList(); // Vuelve a renderizar la lista de contactos.
}

// Inicializa la aplicación renderizando la lista de contactos y actualizando el contador.
renderContactList();
actualizarContador();
