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

// function getCodHora() {
//     if(empty($_GET["codHora"])){
//         $value = 0809;
//     } else {
//         $value = $_GET['codHora'];
//     } 
//     return $value;
// }

// $codHora = getCodHora();

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
    <link rel="stylesheet" href="css/edit.css">
    <script src="js/edit.js" defer></script>
</head>
<body>
    <div id="contenedor-principal">
        <div class="edit-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Consultorio 1</h2>
                    <h2>Miercoles 11 - 12</h2>
                </div>
                <div class="modal-body">
                    <form name="form1" method="post" action="add.php">
                        <label for="precio">DNI</label>
                        <input type="text" name="precio" value="45178142" onkeypress="isInputNumber(event)">
                        <label for="name">Nombre</label>
                        <input type="text" name="name" value="Pablo Cardozo">
                        <label for="precio">Monto pagado</label>
                        <input type="text" name="precio" value="1000" onkeypress="isInputNumber(event)">
                        <label for="precio">Monto a pagar mensualmente</label>
                        <input type="text" name="precio" value="1000" readonly>
                        <div class="modal-footer">
                            <a href="admin.php">
                                <div id="cancelar">CANCELAR</div>
                            </a>
                            <input type="submit" id="guardar" name="Submit" value="GUARDAR">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>