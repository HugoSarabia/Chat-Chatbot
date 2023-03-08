<!--Eliminar color-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $iduser = mysqli_real_escape_string($conn, $_POST['uniqueid']);
    $sql = "SELECT * FROM users WHERE uniqueid = {$iduser}";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($query);
    $sql2 = "SELECT * FROM admin WHERE uniqueid = {$receptor}";
    $query2 = mysqli_query($conn, $sql2);
    $row2 = mysqli_fetch_assoc($query2);

    
    $sql3 = "UPDATE admin SET color = NULL WHERE uniqueid = {$receptor}";
    $query3 = mysqli_query($conn, $sql3);
    $sql4 = "UPDATE users SET encargadoid = NULL, color = NULL WHERE uniqueid = {$iduser}";
    $query4 = mysqli_query($conn, $sql4);
    $output = "success";
    echo $output;
}else{
    header("location: ../login.php");
}    
?>