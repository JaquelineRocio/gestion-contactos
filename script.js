const app = document.querySelector("#app");

const boton = document.querySelector("#addContact");
const contactList = document.querySelector("#contactList");
const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
const contadorContainer = document.createElement("div");
const sortButton = document.createElement("button");

app.appendChild(contadorContainer);
app.appendChild(sortButton);

contadorContainer.innerText = `Cantidad de contactos: ${contactos.length}`;
sortButton.innerText = "Ordenar alfabéticamente";
sortButton.addEventListener("click", ordenarContactos);

// Función para actualizar el contador
function actualizarContador() {
  contadorContainer.innerText = `Cantidad de contactos: ${contactos.length}`;
}

// Función para guardar contactos en localStorage
function guardarContactos() {
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

// Función para renderizar la lista de contactos
function renderContactList() {
  contactList.innerHTML = "";
  contactos.forEach((contacto) => {
    const li = document.createElement("li");
    li.className = "contact-item";
    const inputContactName = document.createElement("input");
    inputContactName.value = contacto;
    inputContactName.disabled = true;
    li.appendChild(inputContactName);

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Eliminar";
    buttonDelete.className = "button-delete";
    buttonDelete.addEventListener("click", eliminarElemento);
    li.appendChild(buttonDelete);

    const buttonEdit = document.createElement("button");
    buttonEdit.innerText = "Actualizar";
    buttonEdit.className = "button-edit";
    buttonEdit.addEventListener("click", actualizarElemento);
    li.appendChild(buttonEdit);
    contactList.appendChild(li);
  });
}

boton.addEventListener("click", () => {
  let inputValue = document.querySelector("#contactName").value.trim();
  const existeContacto = contactos.indexOf(inputValue);

  if (inputValue === "") {
    alert("El campo no puede estar vacío ni contener solo espacios.");
    return false;
  } else if (existeContacto !== -1) {
    alert("No puede agregar contactos repetidos");
    return false;
  } else {
    contactos.push(inputValue);
    guardarContactos();
    renderContactList();
    actualizarContador();
  }
});

function eliminarElemento(event) {
  const boton = event.target;
  const li = boton.parentElement;
  const index = Array.from(contactList.children).indexOf(li);

  if (index > -1) {
    contactos.splice(index, 1);
    guardarContactos();
  }

  renderContactList();
  actualizarContador();
}

function actualizarElemento(event) {
  const boton = event.target;
  const li = boton.parentElement;
  const inputContactName = li.querySelector("input");
  const buttonEdit = li.querySelector(".button-edit");
  let inputValue = inputContactName.value.trim();

  if (buttonEdit.innerText === "Actualizar") {
    inputContactName.disabled = false;
    buttonEdit.innerText = "Guardar";
  } else {
    const existeContacto = contactos.indexOf(inputValue);

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
      const index = Array.from(contactList.children).indexOf(li);
      contactos[index] = inputValue;
      guardarContactos();
      inputContactName.disabled = true;
      buttonEdit.innerText = "Actualizar";
    }
  }
}

// Función para ordenar contactos alfabéticamente
function ordenarContactos() {
  contactos.sort((a, b) => a.localeCompare(b));
  guardarContactos();
  renderContactList();
}

// Inicializar la lista de contactos y contador
renderContactList();
actualizarContador();
