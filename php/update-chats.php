<!--Recupera el numero de mensajes totales de un chat-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $emisor = mysqli_real_escape_string($conn, $_POST['emisor_msj_id']);
    $output;
    $sql = "SELECT COUNT(*) FROM mensajes LEFT JOIN admin ON admin.uniqueid = mensajes.receptor_msj_id 
    WHERE (receptor_msj_id = {$emisor}) 
    OR (emisor_msj_id = {$emisor}) ORDER BY msj_id";
    $query = mysqli_query($conn, $sql);
    if(mysqli_num_rows($query) > 0){
        while($row = mysqli_fetch_assoc($query)){
            $output = $row['COUNT(*)'];
        }
    }
    echo $output;
}else{
    header("location: ../login.php");
}    

?>