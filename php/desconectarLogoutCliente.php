<!--Actualizar conexion del usuario a desconectado del lado del cliente-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $sql = mysqli_query($conn, "UPDATE users SET logout = 1 WHERE uniqueid = $receptor");    

    echo "success";
}else{
    header("location: ../login.php");
}
?>