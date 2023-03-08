<!--Desconectar a los usuarios al terminar la conversación con soporte-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $sql = mysqli_query($conn, "UPDATE users SET logout = 0 WHERE uniqueid = $receptor");    

    echo "success";
}else{
    header("location: ../login.php");
}
?>