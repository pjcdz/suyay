<?php
// Función para leer Docker secrets desde archivos
function getSecret($name) {
    $secretFile = "/run/secrets/$name";
    // Verifica si el archivo existe y es legible
    if (file_exists($secretFile) && is_readable($secretFile)) {
        // Lee el contenido, quita espacios en blanco al inicio/final
        return trim(file_get_contents($secretFile));
    }
    // Retorna null si el secreto no se encuentra
    return null;
}

// Intenta leer desde Docker secrets primero, luego usa variables de entorno, y finalmente valores por defecto
$db_host = getenv('DB_HOST') ?: 'db'; // Generalmente el nombre del servicio Docker
$db_port = getenv('DB_PORT') ?: '3306'; // Puerto por defecto de MySQL
$db_user = getSecret('db_user') ?: getenv('DB_USER') ?: 'root'; // Lee secreto 'db_user', fallback a env 'DB_USER', default 'root'
$db_password = getSecret('db_password') ?: getenv('DB_PASSWORD') ?: ''; // Lee secreto 'db_password', fallback a env 'DB_PASSWORD', default vacío
$db_name = getSecret('db_name') ?: getenv('DB_NAME') ?: 'suyay_db'; // Lee secreto 'db_name', fallback a env 'DB_NAME', default 'suyay_db'

// Crear conexión
$conn = new mysqli($db_host, $db_user, $db_password, $db_name, $db_port);

// Verificar conexión
if ($conn->connect_error) {
    // Es mejor loguear el error que mostrarlo directamente en producción
    error_log("Connection failed: " . $conn->connect_error);
    // Mostrar un mensaje genérico al usuario
    die("Error al conectar con la base de datos.");
}

// Establecer juego de caracteres
if (!$conn->set_charset("utf8")) {
    error_log("Error loading character set utf8: " . $conn->error);
}

?>