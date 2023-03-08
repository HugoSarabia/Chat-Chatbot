<!--Chequeo de nuevos mensajes mediante el conteo de mensajes totales no leidos del lado del cliente-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $output;
    $sql = "SELECT COUNT(*) FROM mensajes LEFT JOIN admin ON admin.uniqueid = mensajes.receptor_msj_id 
    WHERE visto = 1 AND emisor_msj_id = {$receptor}";
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