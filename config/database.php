<?php

// $hostname = '';
// $database = 'suyay';
// $username = 'root';
// $password = '';

// $mysqli = mysqli_connect($hostname, $username, $password, $database); 

// Obtener la URL de la base de datos desde la variable de entorno
$database_url = getenv('RAILWAY_URL');

// Verificar si se pudo obtener la URL de la base de datos
if ($database_url) {
    // Parsear la URL de la base de datos
    $url_parts = parse_url($database_url);
    
    // Obtener los componentes de la URL
    $hostname = $url_parts['host'];
    $database = substr($url_parts['path'], 1);
    $username = $url_parts['user'];
    $password = $url_parts['pass'];
    
    // Crear la conexión a la base de datos
    $mysqli = mysqli_connect($hostname, $username, $password, $database); 
    
    // Verificar si la conexión fue exitosa
    if (!$mysqli) {
        die("Error al conectar a la base de datos: " . mysqli_connect_error());
    }
} else {
    // Manejar el caso en el que no se pudo obtener la URL de la base de datos desde las variables de entorno
    die("No se pudo obtener la URL de la base de datos desde las variables de entorno.");
}

?>
