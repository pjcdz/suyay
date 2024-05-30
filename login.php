<?php

require "config/database.php";

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Suyay</title>
        <!-- <link rel="icon" href="css/img/SS2.png" type="image/icon type"> -->
        <link rel="stylesheet" href="css/login.css">
        <link rel="stylesheet" href='https://fonts.googleapis.com/css?family=DM+Sans%3A700%7CHeebo%3A400%2C700%7CAldrich%3A400&#038;display=swap&#038;ver=6.0.2' media='all'>
    </head>
    <body>
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
                $username = mysqli_real_escape_string($mysqli, $_POST['AdminName']);
                $password = $_POST['AdminPassword'];

                $query = "SELECT * FROM admins WHERE username='$username'";
                $result = mysqli_query($mysqli, $query);

                if(mysqli_num_rows($result)==1) {
                    $admin = mysqli_fetch_assoc($result);
                    if (password_verify($password, $admin['password_hash'])) {
                        session_start();
                        $_SESSION['AdminLoginId'] = $username;
                        header("Location: admin.php");
                    } else {
                        echo"<script>alert('Contraseña incorrecta');</script>";
                    }
                } else {
                    echo"<script>alert('Usuario no encontrado');</script>";
                }
            }
            ?>
        </section>
    </body>
</html>