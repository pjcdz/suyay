<?php
require "config/database.php";

if(isset($_POST['update'])) {   
    $dni = $_POST['dni'];
    $nombre = $_POST['name'];
    $credito = $_POST['credito'];
    $deuda = $_POST['deuda'];
    $codHora = $_POST['codHora'];
    $codConsultorio = $_POST['codConsultorio'];

    // checking empty fields
    if ( empty($credito) ) {
        $credito = 0; 
    }
    
    if( $credito > $deuda ) {
        echo "<font color='red'>No se puede pagar mas de lo que se debe</font><br/>";
    } else {    
        // Determine if paid
        if( $deuda != 0 ) {
            $isPagado = $credito <= $deuda ? 0 : 1;
        }

        // Determine if occupied
        $isOcupado = $dni == 0  || empty($dni) ? 0 : 1;

        // Check if person already exists
        $result = mysqli_query($mysqli, "SELECT * FROM personas WHERE dni='$dni'");
        if(mysqli_num_rows($result) == 0) {
            // If dni is not 0 and person does not exist, create a new entry in personas
            if($dni != 0) {
                $result = mysqli_query($mysqli, "INSERT INTO personas (dni, nombre, credito, deuda) VALUES ('$dni', '$nombre', '$credito', '$deuda')");
            }
        } if ($dni == 0 || empty($dni)) {
            $result = mysqli_query($mysqli, "UPDATE personas SET nombre='', credito=0, deuda=0 WHERE dni='$dni'");
        } else {
            // If person exists, update the person
            $result = mysqli_query($mysqli, "UPDATE personas SET nombre='$nombre', credito='$credito', deuda='$deuda' WHERE dni='$dni'");
        } 

        //updating the table
        $result = mysqli_query($mysqli, "UPDATE horasalquiladas SET dni='$dni', isPagado='$isPagado', isOcupado='$isOcupado' WHERE codHora='$codHora' AND codConsultorio='$codConsultorio'");
        
        //redirectig to the display page. In our case, it is admin.php
        header("Location: admin.php?codConsultorio=$codConsultorio");
    }
}

function getCodConsultorio() {
    if(empty($_GET["codConsultorio"])){
        $value = 1;
    } else {
        $value = $_GET['codConsultorio'];
    } 
    return $value;
}

$codConsultorio = getCodConsultorio();

function getCodHora() {
    $codConsultorio = getCodConsultorio();
    if(empty($_GET["codHora"])){
        header("Location: admin.php?codConsultorio=$codConsultorio");
        exit;
    } else {
        $value = $_GET['codHora'];
    } 
    return $value;
}

$codHora = getCodHora();

$queryHorasAlquiladas = "SELECT dni, isOcupado, isPagado FROM horasalquiladas WHERE codHora = $codHora AND codConsultorio = $codConsultorio";
$resultHorasAlquiladas = mysqli_query($mysqli, $queryHorasAlquiladas);
$rowHorasAlquiladas = mysqli_fetch_assoc($resultHorasAlquiladas);

$dni = $rowHorasAlquiladas["dni"];
$isOcupado = $rowHorasAlquiladas["isOcupado"];
$isPagado = $rowHorasAlquiladas["isPagado"];


$queryConsultorios = "SELECT descripcion FROM consultorios WHERE codConsultorio = $codConsultorio";
$resultConsultorios = mysqli_query($mysqli, $queryConsultorios);
$rowConsultorios = mysqli_fetch_assoc($resultConsultorios);

$descripcionConsultorio = $rowConsultorios["descripcion"];


$queryHoras = "SELECT descripcion FROM horas WHERE codHora = $codHora";
$resultHoras = mysqli_query($mysqli, $queryHoras);
$rowHoras = mysqli_fetch_assoc($resultHoras);

$descripcionHora = $rowHoras["descripcion"];


$queryPersonas = "SELECT nombre, credito, deuda FROM personas WHERE dni = $dni";
$resultPersonas = mysqli_query($mysqli, $queryPersonas);
$rowPersonas = mysqli_fetch_assoc($resultPersonas);

$nombre = $rowPersonas["nombre"];
$credito = $rowPersonas["credito"];
$deuda = $rowPersonas["deuda"];

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
                    <h2><?php echo $descripcionConsultorio; ?></h2>
                    <h2><?php echo $descripcionHora; ?></h2>
                </div>
                <div class="modal-body">
                    <form name="form1" method="post" action="edit.php">
                        <label for="dni">DNI</label>
                        <input type="text" name="dni" value="<?php echo $dni; ?>" onkeypress="isInputNumber(event)">
                        <label for="name">Nombre</label>
                        <input type="text" name="name" value="<?php echo $nombre; ?>">
                        <label for="credito">Monto pagado</label>
                        <input type="text" name="credito" value="<?php echo $credito; ?>" onkeypress="isInputNumber(event)">
                        <label for="deuda">Monto a pagar mensualmente</label>
                        <input type="text" name="deuda" value="<?php echo $deuda; ?>" readonly>
                        <input type="hidden" name="codHora" value="<?php echo $codHora; ?>">
                        <input type="hidden" name="codConsultorio" value="<?php echo $codConsultorio; ?>">
                        <div class="modal-footer">
                            <a href="admin.php?codConsultorio=<?php echo $codConsultorio; ?>">
                                <div id="cancelar">CANCELAR</div>
                            </a>
                            <input type="submit" id="guardar" name="update" value="GUARDAR">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>