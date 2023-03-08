<!--Creación de nuevo mensaje para el Chatbot-->
<?php
include_once "config.php";
$mensaje = mysqli_real_escape_string($conn, $_POST['mensaje']);
$opcionSiguiente = mysqli_real_escape_string($conn, $_POST['opcionSiguiente']);
$opcionPasada = mysqli_real_escape_string($conn, $_POST['opcionPasada']);
if(isset($mensaje)){
    $output = "";
    $sql = "INSERT INTO mensaje (mensaje, id_respuestapara, id_respuestade)
    VALUES ('{$mensaje}', {$opcionSiguiente}, {$opcionPasada})";
    $query = mysqli_query($conn, $sql);
    
    $output = "success";
}else{
    $output="ERROR: Mensaje debe contener algun caracter";
}

echo $output;
?>