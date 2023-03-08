<!--Actualizar datos del mensaje-->
<?php
include_once "config.php";
$idmensaje = mysqli_real_escape_string($conn, $_POST['idmensaje']);
$mensaje = mysqli_real_escape_string($conn, $_POST['mensaje']);
$opcionSiguiente = mysqli_real_escape_string($conn, $_POST['opcionSiguiente']);
$opcionPasada = mysqli_real_escape_string($conn, $_POST['opcionPasada']);
if(isset($mensaje)){
    $output = "";
    $sql = "UPDATE mensaje SET mensaje = '{$mensaje}', id_respuestapara = {$opcionSiguiente}, id_respuestade = {$opcionPasada} WHERE idmensaje = {$idmensaje}";
    $query = mysqli_query($conn, $sql);
    
    $output = "success";
}else{
    $output="ERROR: Opción debe contener algun caracter";
}

echo $output;
?>