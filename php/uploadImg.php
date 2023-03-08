<!--Guardar imagen a la base de datos y guardar la iomagen en la carpeta local del proyecto-->
<?php
session_start();
include_once "config.php";
 
    $msg = "";
    $receptor = $_SESSION['uniqueid'];
    $emisor = mysqli_real_escape_string($conn, $_POST['emisor_msj_id']);
    date_default_timezone_set('America/Mazatlan');
    $fecha = date('Y-m-d');
    $tiempo = date('H:i:s');
    $read = 1;
    $tipo = "imagen";
    $filename = $_FILES["file"]["name"];
    $tempname = $_FILES["file"]["tmp_name"];
    $temp = explode(".", $filename);
    $tiempo = str_replace(':', '.', $tiempo);
    $newfilename = "Imagen de ToronjaLab " . $fecha ." a las ". $tiempo . "." . end($temp);
    $folder = "../chat_imgs/" . $newfilename;

    // Obtener todos los datos enviados desde el formulario
    $sql = mysqli_query($conn, "INSERT INTO mensajes (emisor_msj_id, receptor_msj_id, msj, tiempo_msj, fecha_msj, visto, tipo)
    VALUES ({$emisor}, {$receptor}, '{$newfilename}', '{$tiempo}', '{$fecha}', {$read}, '{$tipo}')");

 
    // Mover la imagen cargada en la carpeta: chat_imgs
    if (move_uploaded_file($tempname, $folder)) {
        echo "success";
    } else {
        echo "fail";
    }
?>