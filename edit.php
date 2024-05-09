<?php
require "config/database.php";

if(isset($_POST['update'])) {   
    $dni = $_POST['dni'];
    $nombre = $_POST['name'];
    $credito = $_POST['credito'];
    $deuda = $_POST['deuda'];
    $codHora = $_POST['codHora'];
    $codConsultorio = $_POST['codConsultorio'];

    // Get the original DNI when the page loads
    $queryHorasAlquiladas = "SELECT dni FROM horasalquiladas WHERE codHora = $codHora AND codConsultorio = $codConsultorio";
    $resultHorasAlquiladas = mysqli_query($mysqli, $queryHorasAlquiladas);
    $rowHorasAlquiladas = mysqli_fetch_assoc($resultHorasAlquiladas);

    $originalDni = $rowHorasAlquiladas["dni"];

    // If the DNI has changed, reduce the debt of the original person by 1000
    if($originalDni != $dni && $originalDni != 0 && !empty($originalDni)) {
        $result = mysqli_query($mysqli, "UPDATE personas SET deuda = deuda - 1000 WHERE dni='$originalDni'");
    }

    // checking empty fields
    if ( empty($credito) ) {
        $credito = 0; 
    }
    
    // Determine if paid
    if( $deuda != 0 ) {
        $isPagado = $credito <= $deuda ? 0 : 1;
    }

    // Determine if occupied
    $isOcupado = $dni == 0  || empty($dni) ? 0 : 1;

    // ERROR: Falta sacarle el credito a una persona cuando ya no tiene mas cosas a su nombre, o en su defecto borrar su entry

    // Check if person already exists
    $result = mysqli_query($mysqli, "SELECT * FROM personas WHERE dni='$dni'");
    if(mysqli_num_rows($result) == 0) { 
        // If dni is not 0 and person does not exist, create a new entry in personas
        if( $dni != 0 || !empty($dni) ) { 
            $result = mysqli_query($mysqli, "INSERT INTO personas (dni, nombre, credito, deuda) VALUES ('$dni', '$nombre', '$credito', '$deuda')");
            $result = mysqli_query($mysqli, "UPDATE personas SET deuda = deuda + 1000 WHERE dni='$dni'");
        }
    } else {
        // If person exists, update the person 
        if( $dni == 0 || empty($dni) ) { 
            $result = mysqli_query($mysqli, "UPDATE personas SET nombre='', credito='0', deuda='0' WHERE dni='$dni'");
        } elseif ( $originalDni != $dni && $dni != 0 && !empty($dni) ) {
            $result = mysqli_query($mysqli, "UPDATE personas SET deuda = deuda + 1000 WHERE dni='$dni'");
        } elseif ( $originalDni != 0 && !empty($originalDni) ) {
            $result = mysqli_query($mysqli, "UPDATE personas SET nombre='$nombre', credito='$credito', deuda='$deuda' WHERE dni='$dni'");
        }
    } 

    //updating the table
    $result = mysqli_query($mysqli, "UPDATE horasalquiladas SET dni='$dni', isPagado='$isPagado', isOcupado='$isOcupado' WHERE codHora='$codHora' AND codConsultorio='$codConsultorio'");
    
    //redirectig to the display page. In our case, it is admin.php
    header("Location: admin.php?codConsultorio=$codConsultorio");
}

function getCodConsultorio() {
    if(empty($_GET["codConsultorio"])){
        header("Location: admin.php?");
        exit;
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


$queryPersonas = "SELECT nombre, credito FROM personas WHERE dni = $dni";
$resultPersonas = mysqli_query($mysqli, $queryPersonas);
$rowPersonas = mysqli_fetch_assoc($resultPersonas);

$nombre = $rowPersonas["nombre"];
$credito = $rowPersonas["credito"];
// $deuda = $rowPersonas["deuda"];

if ($dni == 0) {
    // If dni is 0, set count and deuda to 0
    $count = 0;
    $deuda = 0;
} else {
    // Get the count of rows with the given dni in horasalquiladas
    $result = mysqli_query($mysqli, "SELECT COUNT(*) as count FROM horasalquiladas WHERE dni='$dni'");
    $row = mysqli_fetch_array($result);
    $count = $row['count'];

    // Set deuda to 1000 times the count
    $deuda = $count * 1000;
}

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