<!--Eliminación de mensaje para el Chatbot-->
<?php
include_once "config.php";
$idmensaje = mysqli_real_escape_string($conn, $_POST['idmensaje']);

$sql = "DELETE FROM mensaje WHERE idmensaje = {$idmensaje}";
$query = mysqli_query($conn, $sql);
    
$output = "success";


echo $output;
?>