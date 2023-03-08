<!--Actualizar estado de mensaje leido del usuario-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $option = mysqli_real_escape_string($conn, $_POST['option']);
    $iduser = mysqli_real_escape_string($conn, $_POST['uniqueid']);
    $output = "";

    $sql= "UPDATE users SET leido = {$option} WHERE uniqueid = {$iduser}";
    $query = mysqli_query($conn, $sql);

    if($option == 0){
        $sql2= "UPDATE mensajes SET visto = {$option} WHERE receptor_msj_id = {$iduser}";
        $query2 = mysqli_query($conn, $sql2);
    }
}else{
    header("location: ../login.php");
}    
?>