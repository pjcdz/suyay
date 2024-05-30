<?php

session_start();
if(!isset($_SESSION['AdminLoginId'])) {
    header("Location: login.php");
}

require "config/database.php";


// Consulta SQL para obtener los datos de las personas y sus horas alquiladas junto con las descripciones
$sql = "SELECT personas.dni, personas.nombre, personas.credito, personas.deuda, 
        consultorios.descripcion AS consultorio, horas.descripcion AS hora
        FROM personas
        LEFT JOIN horasalquiladas ON personas.dni = horasalquiladas.dni
        LEFT JOIN consultorios ON horasalquiladas.codConsultorio = consultorios.codConsultorio
        LEFT JOIN horas ON horasalquiladas.codHora = horas.codHora
        WHERE personas.deuda > 0";

$result = $mysqli->query($sql);

$personas = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $dni = $row['dni'];
        $consultorio = $row['consultorio'];
        $hora = $row['hora'];

        // Extraer el día y la hora
        $diaHora = explode(" ", $hora);
        $dia = $diaHora[0];
        $hora = implode(" ", array_slice($diaHora, 1));

        if (!isset($personas[$dni])) {
            $personas[$dni] = [
                'nombre' => $row['nombre'],
                'credito' => $row['credito'],
                'deuda' => $row['deuda'],
                'ocupacion' => []
            ];
        }

        if (!isset($personas[$dni]['ocupacion'][$consultorio])) {
            $personas[$dni]['ocupacion'][$consultorio] = [];
        }

        if (!isset($personas[$dni]['ocupacion'][$consultorio][$dia])) {
            $personas[$dni]['ocupacion'][$consultorio][$dia] = [];
        }

        $personas[$dni]['ocupacion'][$consultorio][$dia][] = $hora;
    }
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suyay - Personas</title>
    <link rel="icon" href="css/suyay.png" type="image/icon type">
    <link rel="stylesheet" href="css/personas.css">
</head>
<body>
    <div id="contenedor-principal">
        <button onclick="window.location.href='admin.php'">Ir a Consultorios</button>
        <h1>Lista de Personas</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Crédito</th>
                    <th>Deuda</th>
                    <th>Ocupación</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    if (!empty($personas)) {
                        foreach ($personas as $dni => $persona) {
                            echo "<tr>";
                            echo "<td>" . htmlspecialchars($dni) . "</td>";
                            echo "<td>" . htmlspecialchars($persona['nombre']) . "</td>";
                            echo "<td>" . htmlspecialchars($persona['credito']) . "</td>";
                            echo "<td>" . htmlspecialchars($persona['deuda']) . "</td>";
                            echo "<td>";
                            foreach ($persona['ocupacion'] as $consultorio => $dias) {
                                echo "<strong>" . htmlspecialchars($consultorio) . ":</strong> ";
                                foreach ($dias as $dia => $horas) {
                                    echo "<strong>" . htmlspecialchars($dia)  . ":</strong><br>";
                                    echo implode("<br>", array_map('htmlspecialchars', $horas));
                                    echo "<br>";
                                }
                            }
                            echo "</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='5'>No hay datos disponibles</td></tr>";
                    }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>

<?php
// Cerrar la conexión a la base de datos
$mysqli->close();
?>