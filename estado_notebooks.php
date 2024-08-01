<?php
$conexion = new mysqli("localhost", "root", "", "registro_notebooks");

if ($conexion->connect_error) {
    echo json_encode(array("error" => "Conexión fallida: " . $conexion->connect_error));
    exit();
}

// Ajustar la consulta para reflejar la estructura y nombres de columnas correctos
$resultado = $conexion->query("SELECT n.ID_Notebook, n.Estado, COALESCE(p.Nombre, '') as UltimoUsuario,
                               (SELECT GROUP_CONCAT(pr.Nombre SEPARATOR ', ') 
                                FROM Programa pr 
                                JOIN Instalacion_Programa ip ON pr.ID_Programa = ip.ID_Programa 
                                WHERE ip.ID_Notebook = n.ID_Notebook) as Programas
                               FROM Notebook n
                               LEFT JOIN Uso_Notebook un ON n.ID_Notebook = un.ID_Notebook AND un.Fecha_Hasta IS NULL
                               LEFT JOIN Persona p ON un.ID_Persona = p.ID_Persona");

if (!$resultado) {
    echo json_encode(array("error" => "Error en la consulta: " . $conexion->error));
    exit();
}

$notebooks = array();
while ($row = $resultado->fetch_assoc()) {
    $notebooks[] = $row;
}

echo json_encode($notebooks);
$conexion->close();
?>
