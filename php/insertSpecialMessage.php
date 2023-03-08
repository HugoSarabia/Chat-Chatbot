<!--Se inserta un mensaje tipo especial para el chat-->
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
    $tipo = "alerta";
    $visto = 0;

    if(!empty($mensaje)){
        $sql = mysqli_query($conn, "INSERT INTO mensajes (emisor_msj_id, receptor_msj_id, msj, tiempo_msj, fecha_msj, visto, tipo)
        VALUES ({$emisor}, {$receptor}, '{$mensaje}', '{$tiempo}', '{$fecha}', {$visto}, '{$tipo}')");
    }else{
        echo "Mensaje vacio";
    }

}else{
    header("location: ../login.php");
}
?>