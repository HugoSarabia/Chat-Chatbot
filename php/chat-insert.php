<!--Registra el mensaje escrito por el usuario a la BD-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $emisor = mysqli_real_escape_string($conn, $_POST['emisor_msj_id']);
    $mensaje = mysqli_real_escape_string($conn, $_POST['mensaje']);
    date_default_timezone_set('America/Mazatlan');
    $fecha = date('Y-m-d');
    $tiempo = date('H:i:s');
    $read = 1;
    $tipo = "normal";

    if(!empty($mensaje)){
        $sql = mysqli_query($conn, "INSERT INTO mensajes (emisor_msj_id, receptor_msj_id, msj, tiempo_msj, fecha_msj, visto, tipo)
        VALUES ({$emisor}, {$receptor}, '{$mensaje}', '{$tiempo}', '{$fecha}', {$read}, '{$tipo}')");
        echo $receptor;
    }else{
        echo "Mensaje vacio";
    }

}else{
    header("location: ../login.php");
}
?>