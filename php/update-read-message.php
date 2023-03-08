<!--Lee los mensajes de soporte y actualiza el visto-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $output = [];
    $sql = "SELECT * FROM mensajes WHERE visto = 1 ORDER BY msj_id DESC LIMIT 1;";
    $query = mysqli_query($conn, $sql);
    $sql2 = mysqli_query($conn, "UPDATE mensajes SET visto = 0 WHERE visto = 1 AND emisor_msj_id = {$receptor}");
    $query2 = mysqli_query($conn, $sql2);

}else{
    header("location: ../login.php");
}    

?>