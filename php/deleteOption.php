<!--Eliminación de mensaje para el Chatbot-->
<?php
include_once "config.php";
$idopcion = mysqli_real_escape_string($conn, $_POST['idopcion']);

$sql = "DELETE FROM opcion WHERE idopcion = {$idopcion}";
$query = mysqli_query($conn, $sql);
    
$output = "success";


echo $output;
?>