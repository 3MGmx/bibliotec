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

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titulo = $_POST['titulo'];
    $autor = $_POST['autor'];
    $pdfFile = $_FILES['pdfFile'];

    // Verificar si se ha subido un archivo
    if ($pdfFile['error'] == UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        $uploadFile = $uploadDir . basename($pdfFile['name']);

        // Mover el archivo subido a la carpeta de uploads
        if (move_uploaded_file($pdfFile['tmp_name'], $uploadFile)) {
            // Insertar la información del libro en la base de datos
            $stmt = $conn->prepare("INSERT INTO libros (titulo, autor, pdf_url) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $titulo, $autor, $uploadFile);

            if ($stmt->execute()) {
                echo "Libro registrado exitosamente.";
            } else {
                echo "Error al registrar el libro: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Error al subir el archivo.";
        }
    } else {
        echo "Error en la subida del archivo.";
    }
}

$conn->close();
?>