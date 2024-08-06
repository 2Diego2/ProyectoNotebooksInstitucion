<?php
$conexion = new mysqli("localhost", "root", "", "registro_notebooks");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$notebook_ids = json_decode($_POST['notebook_ids'], true);
$return_state = $_POST['return_state'] ?? 'good';
$return_comments = $_POST['return_comments'] ?? '';

$response = array();

foreach ($notebook_ids as $notebook_id) {
    // Actualizar estado de la notebook
    $new_state = ($return_state === 'good') ? 'Disponible' : 'Dañado';
    $stmt = $conexion->prepare("UPDATE Notebook SET Estado = ? WHERE ID_Notebook = ?");
    $stmt->bind_param("si", $new_state, $notebook_id);
    if (!$stmt->execute()) {
        $response['error'][] = "Error al actualizar el estado de la notebook {$notebook_id}: " . $stmt->error;
    }
    $stmt->close();

    // Registrar fecha de devolución en Uso_Notebook
    $stmt = $conexion->prepare("UPDATE Uso_Notebook SET Fecha_Hasta = NOW(), Observaciones = ? WHERE ID_Notebook = ? AND Fecha_Hasta IS NULL");
    $stmt->bind_param("si", $return_comments, $notebook_id);
    if (!$stmt->execute()) {
        $response['error'][] = "Error al registrar la devolución de la notebook {$notebook_id}: " . $stmt->error;
    }
    $stmt->close();
}

if (empty($response['error'])) {
    $response['success'] = "Devolución registrada con éxito.";
}

echo json_encode($response);
?>

