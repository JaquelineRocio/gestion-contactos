const boton = document.querySelector("#addContact");
const contactos = [];
const contactList = document.querySelector("#contactList");
boton.addEventListener("click", () => {
  let inputValue = document.querySelector("#contactName").value.trim();
  const existeContacto = contactos.indexOf(inputValue);

  if (inputValue === "") {
    alert("El campo no puede estar vacío ni contener solo espacios.");
    return false; // Evita que el formulario se envíe
  } else if (!existeContacto) {
    alert("No puede agregar contactos repetidos");
    return false; // Evita que el formulario se envíe
  } else {
    contactos.push(inputValue);

    const li = document.createElement("li");

    const inputContactName = document.createElement("input");
    inputContactName.value = inputValue;
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
  }
});

function eliminarElemento(event) {
  const boton = event.target;
  const li = boton.parentElement;
  const index = Array.from(contactList.children).indexOf(li);

  if (index > -1) {
    contactos.splice(index, 1);
  }

  contactList.removeChild(li);
  console.log(contactos);
}

function actualizarElemento(event) {
  const boton = event.target;
  const li = boton.parentElement;
  const inputContactName = li.querySelector("input");
  const buttonEdit = li.querySelector(".button-edit");

  if (buttonEdit.innerText === "Actualizar") {
    inputContactName.disabled = false;
    buttonEdit.innerText = "Guardar";
  } else {
    const index = Array.from(contactList.children).indexOf(li);
    contactos[index] = inputContactName.value;
    inputContactName.disabled = true;
    buttonEdit.innerText = "Actualizar";
    console.log(contactos);
  }
}
