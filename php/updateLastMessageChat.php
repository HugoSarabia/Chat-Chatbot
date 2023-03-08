<!--Lee los mensajes del cliente y actualiza el visto-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $emisor = $_SESSION['uniqueid'];
    $receptor = mysqli_real_escape_string($conn, $_POST['receptor_msj_id']);
    $output = [];
    $sql = "UPDATE mensajes SET visto = 0 WHERE visto = 1 AND receptor_msj_id = {$receptor}";
    $query = mysqli_query($conn, $sql);

    echo "success";

}else{
    header("location: ../login.php");
}
?>