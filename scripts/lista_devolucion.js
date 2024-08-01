function toggleSelection(event) {
    const selectedItem = event.target;

    // Verificar si el elemento ya está seleccionado
    if (selectedItem.classList.contains('selected')) {
        selectedItem.classList.remove('selected'); // Si ya está seleccionado, quitar la clase
    } else {
        selectedItem.classList.add('selected'); // Si no está seleccionado, agregar la clase
    }
}

function crearLista(idLista) {
    const lista = document.getElementById(idLista);
    for (let i = 1; i <= 20; i++) {
        const li = document.createElement('li');
        li.textContent = `Notebook ${i}`;
        lista.appendChild(li);
        // Agregar un evento clic a cada elemento de la lista
        li.addEventListener('click', toggleSelection);
    }
}

window.onload = function() {
    crearLista('lista1');
    crearLista('lista2');
    crearLista('lista3');
};