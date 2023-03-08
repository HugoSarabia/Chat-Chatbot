<!--Chequeo de la conexión de usuarios conectados de soporte-->
<?php
session_start();
include_once "config.php";
$receptor = $_SESSION['uniqueid'];
//$adminID = mysqli_real_escape_string($conn, $_POST['adminID']);

$sql = mysqli_query($conn, "SELECT * FROM admin WHERE status = 'online' ");
$row = mysqli_fetch_assoc($sql);

if(mysqli_num_rows($sql) > 0){
    echo "online";
}else{
    echo "offline";
}


?>