<!--Consulta de conexión del usuario-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $emisor = mysqli_real_escape_string($conn, $_POST['emisor_msj_id']);

    $sql = mysqli_query($conn, "SELECT logout FROM users WHERE uniqueid = {$emisor}");    
    $row = mysqli_fetch_assoc($sql);

    if ($row['logout'] == 1) {
        echo "Desconectado";
    } else if ($row['logout'] == 0){
        echo "Conectado";
    }

}else{
    header("location: ../login.php");
}
?>