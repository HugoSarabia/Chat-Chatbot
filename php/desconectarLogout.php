<!--Actualizar conexion del usuario a desconectado-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $emisor = mysqli_real_escape_string($conn, $_POST['emisor_msj_id']);
    $sql = mysqli_query($conn, "UPDATE users SET logout = 1 WHERE uniqueid = $emisor");    

    echo "success";


}else{
    header("location: ../login.php");
}
?>