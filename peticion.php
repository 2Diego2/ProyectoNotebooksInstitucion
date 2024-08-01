<?php
$conexion = new mysqli("localhost", "root", "", "registro_notebooks");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$tipo = $_POST['tipo'];
$dni = $_POST['dni'];
$notebook_ids = json_decode($_POST['notebook_ids'], true);

$response = array();

// Insertar persona
$stmt = $conexion->prepare("INSERT INTO Persona (Nombre, Apellido, Tipo, DNI) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(array("error" => "Error en la preparación de la consulta: " . $conexion->error));
    exit();
}
$stmt->bind_param("ssss", $nombre, $apellido, $tipo, $dni);
if (!$stmt->execute()) {
    $response['error'][] = "Error al insertar persona: " . $stmt->error;
}
$id_persona = $stmt->insert_id;
$stmt->close();

// Registrar uso y actualizar estado de cada notebook
foreach ($notebook_ids as $notebook_id) {
    // Actualizar estado de la notebook a 'Ocupado'
    $stmt = $conexion->prepare("UPDATE Notebook SET Estado = 'Ocupado' WHERE ID_Notebook = ?");
    if (!$stmt) {
        $response['error'][] = "Error en la preparación de la consulta: " . $conexion->error;
        continue;
    }
    $stmt->bind_param("i", $notebook_id);
    if (!$stmt->execute()) {
        $response['error'][] = "Error al actualizar el estado de la notebook {$notebook_id}: " . $stmt->error;
    }
    $stmt->close();

    // Registrar uso de la notebook
    $stmt = $conexion->prepare("INSERT INTO Uso_Notebook (ID_Notebook, ID_Persona, Fecha_Desde) VALUES (?, ?, NOW())");
    if (!$stmt) {
        $response['error'][] = "Error en la preparación de la consulta: " . $conexion->error;
        continue;
    }
    $stmt->bind_param("ii", $notebook_id, $id_persona);
    if (!$stmt->execute()) {
        $response['error'][] = "Error al registrar el uso de la notebook {$notebook_id}: " . $stmt->error;
    }
    $stmt->close();
}

if (empty($response['error'])) {
    $response['success'] = "Petición registrada con éxito.";
}

echo json_encode($response);
?>
