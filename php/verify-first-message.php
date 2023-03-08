<!--Verificar si el último mensaje es el de invitación del chat o la respuesta al mismo-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $emisor = mysqli_real_escape_string($conn, $_POST['emisor_msj_id']);

    $sql = "SELECT * FROM mensajes LEFT JOIN admin ON admin.uniqueid = mensajes.receptor_msj_id 
    WHERE (receptor_msj_id = {$receptor} OR emisor_msj_id = {$receptor}) ORDER BY msj_id DESC LIMIT 1";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($query);
    
    $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE uniqueid = $receptor");
    $row2 = mysqli_fetch_assoc($sql2);
    if($row['msj'] == "¡{$row2['username']} desea chatear!"){
        echo "fail";
    }else{
        echo "success";
    }

}else{
    header("location: ../login.php");
}
?>