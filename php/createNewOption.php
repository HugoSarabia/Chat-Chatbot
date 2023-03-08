<!--Creación de nueva opción para el Chatbot-->
<?php
include_once "config.php";
$opcion = mysqli_real_escape_string($conn, $_POST['opcion']);
$tipo = mysqli_real_escape_string($conn, $_POST['tipo']);
$mensajeRespondido = mysqli_real_escape_string($conn, $_POST['mensajeRespondido']);
$mensajeAMostrar = mysqli_real_escape_string($conn, $_POST['mensajeAMostrar']);
if(isset($opcion)){
    $output = "";
    $sql = "INSERT INTO opcion (opcion, tipo, id_respuestade, id_respuestapara)
    VALUES ('{$opcion}', '{$tipo}', {$mensajeRespondido}, {$mensajeAMostrar})";
    $query = mysqli_query($conn, $sql);
    
    $output = "success";
}else{
    $output="ERROR: Opción debe contener algun caracter";
}

echo $output;
?>