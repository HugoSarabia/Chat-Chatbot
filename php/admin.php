<!--Muestra los chats de manera descendente por el mensaje más reciente-->
<?php
session_start();
include_once "config.php";
$receptor = $_SESSION['uniqueid'];

$sql = mysqli_query($conn, "SELECT *, 
(SELECT msj_id FROM mensajes sc 
WHERE sc.emisor_msj_id = s.uniqueid OR sc.receptor_msj_id = s.uniqueid ORDER BY msj_id DESC LIMIT 1) AS msj_id
FROM users s ORDER BY msj_id DESC");
$output ="";
if(mysqli_num_rows($sql) == 0){
    $output .= "Error";
}elseif(mysqli_num_rows($sql) > 0){
    include_once "data.php";
}
echo $output;
?>