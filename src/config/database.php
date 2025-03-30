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
    
    // En el entorno Docker, se debe usar el puerto interno del contenedor (3306)
    // No el puerto mapeado en el host (3309)
    // Si el puerto está en la URL, se ignora y se usa el puerto predeterminado de MySQL
    
    // Crear la conexión a la base de datos sin especificar el puerto (usará el predeterminado 3306)
    $mysqli = mysqli_connect($hostname, $username, $password, $database);
} else {
    // Alternativa: usar variables de entorno individuales (útil en Coolify)
    $hostname = getenv('DB_HOST') ?: 'db';
    // Usar el puerto interno 3306 para comunicación dentro de Docker, no 3309
    $database = getenv('DB_NAME') ?: 'suyay_db';
    $username = getenv('DB_USER') ?: 'root';
    $password = getenv('DB_PASSWORD') ?: 'suyay_password';
    
    // Crear la conexión a la base de datos sin especificar el puerto
    $mysqli = mysqli_connect($hostname, $username, $password, $database);
}

// Verificar si la conexión fue exitosa
if (!$mysqli) {
    die("Error al conectar a la base de datos: " . mysqli_connect_error());
}
?>
