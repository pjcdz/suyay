<?php

session_start();
if(!isset($_SESSION['AdminLoginId'])) {
    header("Location: login");
}

require_once 'config/database.php';

function getCodConsultorio() {
    if(empty($_GET["codConsultorio"])){
        $value = 1;
    } else {
        $value = $_GET['codConsultorio'];
    } 
    return $value;
}

$codConsultorio = getCodConsultorio();

// 1. Define un array asociativo para mapear los DNI a clases CSS.
$dnis = array();

function getEstadoHora($codHora, $codConsultorio) {
    global $mysqli;
    // 2. En la función `getEstadoHora`, además de `isOcupado` y `isPagado`, selecciona también el DNI.
    $query = "SELECT isOcupado, isPagado, dni FROM horasalquiladas WHERE codHora = $codHora AND codConsultorio = $codConsultorio";
    $result = mysqli_query($mysqli, $query);
    $row = mysqli_fetch_assoc($result);
    return $row;
}

$codHoras0809 = array(10809, 20809, 30809, 40809, 50809, 60809);
$codHoras0910 = array(10910, 20910, 30910, 40910, 50910, 60910);
$codHoras1011 = array(11011, 21011, 31011, 41011, 51011, 61011);
$codHoras1112 = array(11112, 21112, 31112, 41112, 51112, 61112);
$codHoras1213 = array(11213, 21213, 31213, 41213, 51213, 61213);
$codHoras1314 = array(11314, 21314, 31314, 41314, 51314, 61314);
$codHoras1415 = array(11415, 21415, 31415, 41415, 51415, 61415);
$codHoras1516 = array(11516, 21516, 31516, 41516, 51516, 61516);
$codHoras1617 = array(11617, 21617, 31617, 41617, 51617, 61617);
$codHoras1718 = array(11718, 21718, 31718, 41718, 51718, 61718);
$codHoras1819 = array(11819, 21819, 31819, 41819, 51819, 61819);
$codHoras1920 = array(11920, 21920, 31920, 41920, 51920, 61920);
$codHoras2021 = array(12021, 22021, 32021, 42021, 52021, 62021);
$codHoras2122 = array(12122, 22122, 32122, 42122, 52122, 62122);

function renderHoras($codHoras, $codConsultorio) {
    global $dnis;
    foreach ($codHoras as $codHora) {
        $estadoHora = getEstadoHora($codHora, $codConsultorio);
        $class = 'dia';
        $linkText = '';
        if ($estadoHora['isOcupado']) {
            $dni = $estadoHora['dni'];
            if (isset($dnis[$dni])) {
                $class .= ' ' . $dnis[$dni];
            } else {
                // Usa el operador de módulo para asegurarte de que el número de la clase no exceda 5.
                $dnis[$dni] = 'dia-ocupado' . ((count($dnis) % 5) + 1);
                $class .= ' ' . $dnis[$dni];
            }
            if (!$estadoHora['isPagado']) {
                $linkText = '<span class="unpaid-marker">❌</span>';
            }
        }
        echo "<a href=\"edit?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"$class\">$linkText</a>";
    }
}

$horas = ["8 - 9", "9 - 10", "10 - 11", "11 - 12", "12 - 13", "13 - 14", "14 - 15", "15 - 16", "16 - 17", "17 - 18", "18 - 19", "19 - 20", "20 - 21", "21 - 22"];
$codHoras = ["codHoras0809", "codHoras0910", "codHoras1011", "codHoras1112", "codHoras1213", "codHoras1314", "codHoras1415", "codHoras1516", "codHoras1617", "codHoras1718", "codHoras1819", "codHoras1920", "codHoras2021", "codHoras2122"];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suyay - Admin</title>
    <link rel="icon" href="css/suyay.png" type="image/icon type">
    <link rel="stylesheet" href="/css/index.css">
    <script src="/js/edit.js" defer></script>
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

    <!-- Imagen que se mostrará cuando se comparta la página -->
    <meta property="og:image" content="/css/suyayIcon.png">

    <!-- Título que se mostrará cuando se comparta la página -->
    <meta property="og:title" content="Suyay">
    <meta name="description" content="Consultorios Interdisciplinarios - Psicología, Psicopedagogía, Fonoaudiología y afines.">

    <!-- Descripción que se mostrará cuando se comparta la página -->
    <meta property="og:description" content="Consultorios Interdisciplinarios - Psicología, Psicopedagogía, Fonoaudiología y afines.">

    <!-- Tipo de contenido (por ejemplo, website, article, etc.) -->
    <meta property="og:type" content="website">
</head>
<body>
    <div id="particles-js"></div>
    <div id="contenedor-principal">
        <div id="selector-consultorio">
        <select id="consultorioSelect" onchange="window.location.href=this.value;">
                <option value="admin?codConsultorio=1" <?php if($codConsultorio == 1) echo 'selected'; ?>>Consultorio 1</option>
                <option value="admin?codConsultorio=2" <?php if($codConsultorio == 2) echo 'selected'; ?>>Consultorio 2</option>
                <option value="admin?codConsultorio=3" <?php if($codConsultorio == 3) echo 'selected'; ?>>Consultorio 3</option>
                <option value="admin?codConsultorio=4" <?php if($codConsultorio == 4) echo 'selected'; ?>>Consultorio 4</option>
                <!-- <option value="admin?codConsultorio=5">Consultorio 5</option>
                <option value="admin?codConsultorio=6">Consultorio 6</option> -->
            </select>
            <button onclick="window.location.href='personas'">Personas</button>
        </div>
        <div id="calendario">
            <!-- Repite esta estructura para cada hora del día -->
            <div class="hora">
                <div class="tiempo">Horas</div>
                <div class="tiempo">Lun.</div>
                <div class="tiempo">Mar.</div>
                <div class="tiempo">Mié.</div>
                <div class="tiempo">Jue.</div>
                <div class="tiempo">Vie.</div>
                <div class="tiempo">Sáb.</div>
            </div>
            <?php
            for ($i = 0; $i < count($horas); $i++) {
                echo '<div class="hora">';
                echo '<div class="tiempo">' . $horas[$i] . '</div>';
                $horaVariable = ${$codHoras[$i]};
                renderHoras($horaVariable, $codConsultorio);
                echo '</div>';
            }
            ?>
        </div>
    </div>
</body>
</html>