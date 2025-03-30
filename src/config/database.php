<?php

// Primero intenta obtener la conexión desde DB_URL (como está configurado actualmente)
$database_url = getenv('DB_URL');

if ($database_url) {
    // Parsear la URL de la base de datos
    $url_parts = parse_url($database_url);
    
    // Obtener los componentes de la URL
    $hostname = $url_parts['host'];
    $database = substr($url_parts['path'], 1);
    $username = $url_parts['user'];
    $password = $url_parts['pass'];
    $port = $url_parts['port']; // Obtener el puerto de la URL
    
    // Crear la conexión a la base de datos con el puerto
    $mysqli = mysqli_connect($hostname, $username, $password, $database, $port);
} else {
    // Alternativa: usar variables de entorno individuales (útil en Coolify)
    $hostname = getenv('DB_HOST') ?: 'db';
    $port = getenv('DB_PORT') ?: '3309';
    $database = getenv('DB_NAME') ?: 'suyay_db';
    $username = getenv('DB_USER') ?: 'root';
    $password = getenv('DB_PASSWORD') ?: 'suyay_password';
    
    // Crear la conexión a la base de datos con las variables individuales
    $mysqli = mysqli_connect($hostname, $username, $password, $database, $port);
}

// Verificar si la conexión fue exitosa
if (!$mysqli) {
    die("Error al conectar a la base de datos: " . mysqli_connect_error());
}
?>
