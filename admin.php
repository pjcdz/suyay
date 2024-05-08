<?php
require "config/database.php";

function getCodConsultorio() {
    if(empty($_GET["codConsultorio"])){
        $value = 1;
    } else {
        $value = $_GET['codConsultorio'];
    } 
    return $value;
}

$codConsultorio = getCodConsultorio();
function getIsOcupado($codHora, $codConsultorio) {
    global $mysqli;
    $query = "SELECT isOcupado FROM horasalquiladas WHERE codHora = $codHora AND codConsultorio = $codConsultorio";
    $result = mysqli_query($mysqli, $query);
    $row = mysqli_fetch_assoc($result);
    return $row['isOcupado'];
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

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suyay</title>
    <link rel="stylesheet" href="css/index.css">
    <script src="js/index.js" defer></script>
</head>
<body>
    <div id="contenedor-principal">
        <div id="selector-consultorio">
        <select id="consultorioSelect" onchange="window.location.href=this.value;">
                <option value="admin.php?codConsultorio=<?php echo $codConsultorio; ?>">Consultorio seleccionado: <?php echo $codConsultorio; ?></option>
                <option value="admin.php?codConsultorio=1">Consultorio 1</option>
                <option value="admin.php?codConsultorio=2">Consultorio 2</option>
                <option value="admin.php?codConsultorio=3">Consultorio 3</option>
                <option value="admin.php?codConsultorio=4">Consultorio 4</option>
                <option value="admin.php?codConsultorio=5">Consultorio 5</option>
                <option value="admin.php?codConsultorio=6">Consultorio 6</option>
            </select>
        </div>
        <div id="calendario">
            <!-- Repite esta estructura para cada hora del día -->
            <div class="hora">
                <div class="tiempo">Horas</div>
                <div class="tiempo">Lunes</div>
                <div class="tiempo">Martes</div>
                <div class="tiempo">Miércoles</div>
                <div class="tiempo">Jueves</div>
                <div class="tiempo">Viernes</div>
                <div class="tiempo">Sabado</div>
            </div>
            <div class="hora">
                <div class="tiempo">8 - 9</div>
                <?php
                foreach ($codHoras0809 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- Repite esto para cada hora hasta las 21:00 -->
            <div class="hora">
                <div class="tiempo">9 - 10</div>
                <?php
                foreach ($codHoras0910 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">10 - 11</div>
                <?php
                foreach ($codHoras1011 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">11 - 12</div>
                <?php
                foreach ($codHoras1112 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">12 - 13</div>
                <?php
                foreach ($codHoras1213 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">13 - 14</div>
                <?php
                foreach ($codHoras1314 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">14 - 15</div>
                <?php
                foreach ($codHoras1415 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">15 - 16</div>
                <?php
                foreach ($codHoras1516 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">16 - 17</div>
                <?php
                foreach ($codHoras1617 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">17 - 18</div>
                <?php
                foreach ($codHoras1718 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">18 - 19</div>
                <?php
                foreach ($codHoras1819 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">19 - 20</div>
                <?php
                foreach ($codHoras1920 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">20 - 21</div>
                <?php
                foreach ($codHoras2021 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
            <div class="hora">
                <div class="tiempo">21 - 22</div>
                <?php
                foreach ($codHoras2122 as $codHora) {
                    $class = getIsOcupado($codHora, $codConsultorio) ? 'dia dia-false' : 'dia';
                    echo "<a href=\"edit.php?codConsultorio=$codConsultorio&codHora=$codHora\" class=\"dia $class\"></a>";
                }
                ?>
            </div>
            <!-- ... -->
        </div>
    </div>
</body>
</html>