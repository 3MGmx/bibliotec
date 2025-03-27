<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root"; // Cambia esto por tu usuario de MySQL
$password = ""; // Cambia esto por tu contraseña de MySQL
$dbname = "biblioteca_digital";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtener los libros de la base de datos
$sql = "SELECT id, titulo, autor, pdf_url FROM libros";
$result = $conn->query($sql);

$libros = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $libros[] = $row;
    }
}

// Devolver los libros en formato JSON
header('Content-Type: application/json');
echo json_encode($libros);

$conn->close();
?>