<!--Actualizar datos de la opción-->
<?php
include_once "config.php";
$idopcion = mysqli_real_escape_string($conn, $_POST['idopcion']);
$opcion = mysqli_real_escape_string($conn, $_POST['opcion']);
$tipo = mysqli_real_escape_string($conn, $_POST['tipo']);
$mensajeRespondido = mysqli_real_escape_string($conn, $_POST['mensajeRespondido']);
$mensajeAMostrar = mysqli_real_escape_string($conn, $_POST['mensajeAMostrar']);
if(isset($opcion)){
    $output = "";
    $sql = "UPDATE opcion SET opcion = '{$opcion}', tipo = '{$tipo}', id_respuestade = {$mensajeRespondido}, id_respuestapara = {$mensajeAMostrar} WHERE idopcion = {$idopcion}";
    $query = mysqli_query($conn, $sql);
    
    $output = "success";
}else{
    $output="ERROR: Opción debe contener algun caracter";
}

echo $output;
?>