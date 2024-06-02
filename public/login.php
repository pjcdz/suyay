<?php

require_once '../config/database.php';

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Suyay - Login</title>
        <link rel="icon" href="/css/suyay.png" type="image/icon type">
        <link rel="stylesheet" href="/css/login.css">
        <script src="/js/edit.js" defer></script>
        <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    </head>
    <body>
        <div id="particles-js"></div>
        <section id="home">
            <div class="login-box">
                <img src="css/suyay.png" class="avatar" alt="Avatar Image">
                <div id="form">
                    <form method="POST">
                        <label for="username">Nombre de usuario</label>
                        <input name="AdminName" type="text" placeholder="Ingrese su nombre de usuario">
                        <label for="password">Contraseña</label>
                        <input name="AdminPassword" type="password" placeholder="Ingrese su contraseña">
                        <input name="Signin" type="submit" value="Log In">
                    </form>
                </div>
            </div>

            <?php 
                if(isset($_POST['Signin'])) {
                    $username = $_POST['AdminName']; // No es necesario escapar con mysqli_real_escape_string

                    // Prepara la consulta SQL con un marcador de posición
                    $query = "SELECT * FROM admins WHERE username=?";
                    
                    // Prepara la consulta
                    $stmt = mysqli_prepare($mysqli, $query);
                    
                    // Vincula el parámetro al marcador de posición
                    mysqli_stmt_bind_param($stmt, "s", $username);
                    
                    // Ejecuta la consulta
                    mysqli_stmt_execute($stmt);
                    
                    // Obtiene el resultado
                    $result = mysqli_stmt_get_result($stmt);
                    
                    // Verifica si se encontró un usuario con ese nombre
                    if(mysqli_num_rows($result) == 1) {
                        $admin = mysqli_fetch_assoc($result);
                        
                        // Verifica la contraseña
                        if (password_verify($_POST['AdminPassword'], $admin['password_hash'])) {
                            session_start();
                            $_SESSION['AdminLoginId'] = $username;
                            header("Location: admin");
                            exit(); // Termina la ejecución del script después de redirigir
                        } else {
                            echo "<script>alert('Contraseña incorrecta');</script>";
                        }
                    } else {
                        echo "<script>alert('Usuario no encontrado');</script>";
                    }
                }
            ?>
        </section>
    </body>
</html>