<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nombre_de_tu_base_de_datos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_notebook = $_POST['id_notebook'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $tipo = $_POST['tipo'];
    $dni = $_POST['dni'];

    // Validar datos
    if (empty($id_notebook) || empty($nombre) || empty($apellido) || empty($tipo) || empty($dni)) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    // Verificar si la notebook está disponible
    $sql = "SELECT Estado FROM notebooks WHERE ID_Notebook = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_notebook);
    $stmt->execute();
    $stmt->bind_result($estado);
    $stmt->fetch();
    $stmt->close();

    if ($estado !== 'Disponible') {
        echo "La notebook no está disponible.";
        exit;
    }

    // Actualizar el estado de la notebook y registrar el pedido
    $sql = "UPDATE notebooks SET Estado = 'Ocupado', Nombre = ?, Apellido = ?, Tipo = ?, DNI = ? WHERE ID_Notebook = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $nombre, $apellido, $tipo, $dni, $id_notebook);

    if ($stmt->execute()) {
        echo "Pedido realizado con éxito.";
    } else {
        echo "Error al realizar el pedido.";
    }

    $stmt->close();
}

$conn->close();
?>