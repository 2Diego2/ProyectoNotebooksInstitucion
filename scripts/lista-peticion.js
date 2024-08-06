document.addEventListener("DOMContentLoaded", function() {
    function toggleSelection(event) {
        const selectedItem = event.target;

        if (selectedItem.classList.contains('selected')) {
            selectedItem.classList.remove('selected');
        } else {
            selectedItem.classList.add('selected');
        }

        actualizarBotones();
    }

    function crearLista(idLista, notebooks) {
        const lista = document.getElementById(idLista);
        lista.innerHTML = '';  // Limpiar la lista existente
        notebooks.forEach(notebook => {
            const li = document.createElement('li');
            li.textContent = `Notebook ${notebook.ID_Notebook}`;
            li.dataset.notebookId = notebook.ID_Notebook;
            li.dataset.notebookEstado = notebook.Estado; // Añadir estado al dataset
            li.addEventListener('click', toggleSelection);
            if (notebook.Estado === 'Ocupado') {
                li.classList.add('ocupado');
            }
            lista.appendChild(li);
        });
    }

    function actualizarBotones() {
        const pedirButton = document.getElementById('pedir-button');
        const devolverButton = document.getElementById('devolver-button');
        const seleccionados = document.querySelectorAll('.selected');

        let hayOcupados = false;
        seleccionados.forEach(item => {
            if (item.dataset.notebookEstado === 'Ocupado') {
                hayOcupados = true;
            }
        });

        if (seleccionados.length > 0) {
            pedirButton.classList.remove('hidden');
            if (hayOcupados) {
                devolverButton.classList.remove('hidden');
            } else {
                devolverButton.classList.add('hidden');
            }
        } else {
            pedirButton.classList.add('hidden');
            devolverButton.classList.add('hidden');
        }
    }

    function cargarNotebooks(filtro = '') {
        const xhr = new XMLHttpRequest();
        let url = "estado_notebooks.php";
        if (filtro) {
            url += "?filtro=" + encodeURIComponent(filtro);
        }

        xhr.open("GET", url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const notebooks = JSON.parse(xhr.responseText);
                    crearLista('lista1', notebooks.slice(0, 5));
                    crearLista('lista2', notebooks.slice(5, 10));
                    crearLista('lista3', notebooks.slice(10, 15));
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

    function aplicarFiltro() {
        const filtro = document.getElementById('filtro').value;
        cargarNotebooks(filtro);
    }

    function pedirNotebook() {
        const seleccionados = document.querySelectorAll('.selected');
        if (seleccionados.length === 0) {
            alert("Por favor seleccione una notebook.");
            return;
        }
        document.getElementById("formulario").style.display = "block";
    }

    function confirmarPedido() {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const tipo = document.getElementById('tipo').value;
        const dni = document.getElementById('dni').value;

        if (!nombre || !apellido || !tipo || !dni) {
            alert("Por favor complete todos los campos.");
            return;
        }

        const seleccionados = document.querySelectorAll('.selected');
        const ids = Array.from(seleccionados).map(item => item.dataset.notebookId);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "peticion.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200) {
                alert("Pedido realizado con éxito.");
                cargarNotebooks(); // Recargar la lista
                document.getElementById("formulario").style.display = "none";
            } else {
                alert("Error al realizar el pedido.");
            }
        };
        xhr.send(`notebook_ids=${JSON.stringify(ids)}&nombre=${nombre}&apellido=${apellido}&tipo=${tipo}&dni=${dni}`);
    }

    function devolverNotebook() {
        const seleccionados = document.querySelectorAll('.selected');
        if (seleccionados.length === 0) {
            alert("Por favor seleccione una notebook.");
            return;
        }
        const ids = Array.from(seleccionados).map(item => item.dataset.notebookId);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "devolucion.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200) {
                alert("Devolución realizada con éxito.");
                cargarNotebooks(); // Recargar la lista
                selectedNotebook = null;
            } else {
                alert("Error al realizar la devolución.");
            }
        };
        xhr.send(`notebook_ids=${JSON.stringify(ids)}`);
    }

    document.getElementById("filtro").addEventListener("change", aplicarFiltro);
    document.getElementById("pedir-button").addEventListener("click", pedirNotebook);
    document.getElementById("confirmar").addEventListener("click", confirmarPedido);
    document.getElementById("cerrar-formulario").addEventListener("click", cerrarFormulario);
    document.getElementById("devolver-button").addEventListener("click", devolverNotebook);
    document.getElementById("cerrar-formulario-devolucion").addEventListener("click", cerrarFormularioDevolucion);

    cargarNotebooks(); // Cargar todas las notebooks al inicio
});
function mostrarFormulario() {
    document.getElementById('formulario').style.display = 'block';
}

function cerrarFormulario() {
    document.getElementById('formulario').style.display = 'none';
}

function mostrarFormularioDevolucion() {
    document.getElementById('formulario-devolucion').style.display = 'block';
}

function cerrarFormularioDevolucion() {
    document.getElementById('formulario-devolucion').style.display = 'none';
}


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