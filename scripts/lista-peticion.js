function toggleSelection(event) {
    const selectedItem = event.target;

    if (selectedItem.classList.contains('selected')) {
        selectedItem.classList.remove('selected');
    } else {
        selectedItem.classList.add('selected');
    }

    actualizarBotonPedir();
}

function crearLista(idLista) {
    const lista = document.getElementById(idLista);
    for (let i = 1; i <= 5; i++) {
        const li = document.createElement('li');
        li.textContent = `Notebook ${i}`;
        lista.appendChild(li);
        li.addEventListener('click', toggleSelection);
    }
}

function actualizarBotonPedir() {
    const pedirButton = document.getElementById('pedir-button');
    const seleccionados = document.querySelectorAll('.selected');

    if (seleccionados.length > 0) {
        pedirButton.classList.remove('hidden');
    } else {
        pedirButton.classList.add('hidden');
    }
}

function mostrarFormulario() {
    document.getElementById('formulario').style.display = 'block';
}

function cerrarFormulario() {
    document.getElementById('formulario').style.display = 'none';
}

function pedirNotebooks() {
    const seleccionados = document.querySelectorAll('.selected');
    const ids = Array.from(seleccionados).map(item => item.dataset.id);
    const formData = new FormData(document.getElementById('form-peticion'));

    formData.append('notebook_ids', JSON.stringify(ids));

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "peticion.php", true);
    xhr.onload = function() {
        try {
            const response = JSON.parse(xhr.responseText);
            if (response.error) {
                alert('Error: ' + response.error.join('\n'));
            } else {
                alert('Éxito: ' + response.success);
            }
        } catch (e) {
            console.error("Error de respuesta JSON:", xhr.responseText);
            alert("Ocurrió un error al procesar la solicitud.");
        }
    };
    xhr.send(formData);
}

function searchNotebooks() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const notebooks = document.querySelectorAll('li');
    notebooks.forEach(notebook => {
        if (notebook.textContent.toLowerCase().includes(searchTerm)) {
            notebook.style.display = '';
        } else {
            notebook.style.display = 'none';
        }
    });
}

function filterNotebooks() {
    const filterValue = document.getElementById('filter-select').value;
    const notebooks = document.querySelectorAll('li');
    notebooks.forEach(notebook => {
        if (filterValue === 'all' || notebook.dataset.notebookEstado === filterValue) {
            notebook.style.display = '';
        } else {
            notebook.style.display = 'none';
        }
    });
}

function generateReport() {
    // Aquí iría la lógica para generar el reporte
    alert('Función de generación de reporte no implementada');
}

function updateAvailableCount() {
    const availableNotebooks = document.querySelectorAll('li:not(.ocupado)').length;
    document.getElementById('available-count').textContent = availableNotebooks;
}

function searchNotebook() {
    const notebookNumber = document.getElementById('notebook-number').value;
    // Aquí iría la lógica para buscar información de una notebook específica
    alert(`Buscando información para Notebook ${notebookNumber}`);
}

function updateHistoryList() {
    // Aquí iría la lógica para actualizar el historial de préstamos
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '<li>Ejemplo de préstamo</li>';
}

// Modificar la función cargarNotebooks para incluir la actualización del contador
function cargarNotebooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/SeguimientoNotebooks/estado_notebooks.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const notebooks = JSON.parse(xhr.responseText);
                crearLista('lista1', notebooks.slice(0, 5));
                crearLista('lista2', notebooks.slice(5, 10));
                crearLista('lista3', notebooks.slice(10, 15));
                updateAvailableCount();
                updateHistoryList();
            } catch (e) {
                console.error("Error de parseo JSON:", xhr.responseText);
                alert("Error al procesar los datos de las notebooks.");
            }
        } else {
            console.error("HTTP Error:", xhr.status, xhr.statusText);
            alert("Error al cargar los datos de las notebooks.");
        }
    };
    xhr.onerror = function() {
        console.error("Error de red.");
        alert("Error de red al intentar cargar los datos de las notebooks.");
    };
    xhr.send();
}


document.getElementById("pedir-button").addEventListener("click", mostrarFormulario);
document.getElementById("confirmar").addEventListener("click", pedirNotebooks);
document.getElementById("cerrar-formulario").addEventListener("click", cerrarFormulario);

document.getElementById('search-input').addEventListener('input', searchNotebooks);
document.getElementById('filter-select').addEventListener('change', filterNotebooks);
document.getElementById('notebook-number').addEventListener('change', searchNotebook);

window.onload = function() {
    crearLista('lista1');
    crearLista('lista2');
    crearLista('lista3');
};
window.onload = cargarNotebooks;


/*
//A continuación la creacion de listas de
function crearLista(idLista) {
    const lista = document.getElementById(idLista);
    for (let i = 1; i <= 20; i++) {
        const li = document.createElement('li');
        li.textContent = `Notebook ${i}`;
        lista.appendChild(li);
    }
}

function toggleSelection(event) {
    event.target.classList.toggle('selected');
}

window.onload = function() {
    crearLista('lista1');
    crearLista('lista2');
    crearLista('lista3');
};

//cuando cada elemento se pulse quedará de otro color (red)

const lista1Items = document.querySelectorAll('#lista1 li');
*/