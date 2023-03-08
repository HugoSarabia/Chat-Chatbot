<!--Actualización de un nuevo color a soporte y cliente-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $iduser = mysqli_real_escape_string($conn, $_POST['uniqueid']);
    $output ="";
    $aleatColors = array();
    $color = "";
    $sql = "SELECT * FROM users WHERE uniqueid = {$iduser}";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($query);
    $sql2 = "SELECT * FROM admin WHERE uniqueid = {$receptor}";
    $query2 = mysqli_query($conn, $sql2);
    $row2 = mysqli_fetch_assoc($query2);
    $sql3 = "SELECT * FROM admin";
    $query3 = mysqli_query($conn, $sql2);
    $row3 = mysqli_fetch_assoc($query2);
    $aleatColorsUser = array();
    $aleatColorsUser = array();

    function generarNuevoColor(){
        $color = "#";
        for($i = 0; $i < 6; $i++){
            $color = sprintf('#%06X', mt_rand(0, 0xFFFFFF));
        }
        return $color;
    }

    while($row3 = mysqli_fetch_assoc($query3)){
        array_push($aleatColors,$row3['color']);
    }
    if(isset($row['logout'])){
        if($row['logout'] == 0){
            if(!isset($row2['color']) && !isset($row['color']) || !isset($row2['color']) && isset($row['color'])){
                $color = generarNuevoColor();
                while(in_array($color,$aleatColors)){
                    $color = generarNuevoColor();
                }
                $sql4 = "UPDATE admin SET color = '{$color}' WHERE uniqueid = {$receptor}";
                $query4 = mysqli_query($conn, $sql4);
                $sql5 = "UPDATE users SET encargadoid = {$receptor}, color = '{$color}' WHERE uniqueid = {$iduser}";
                $query5 = mysqli_query($conn, $sql5);
                $output = "nuevo color";
            }else if(isset($row2['color']) && !isset($row['color'])){
                $color = $row2['color'];
                $sql4 = "UPDATE admin SET color = '{$color}' WHERE uniqueid = {$receptor}";
                $query4 = mysqli_query($conn, $sql4);
                $sql5 = "UPDATE users SET encargadoid = {$receptor}, color = '{$color}' WHERE uniqueid = {$iduser}";
                $query5 = mysqli_query($conn, $sql5);
                $output = "mismo color"; 
            }else if(isset($row2['color']) && isset($row['color'])){
                if($row2['color'] === $row['color']){
                    //Caso en el que mismo usuario quiera asignarse el mimso usuario
                    $output = "bloquear";
                }else{
                    $color = $row2['color'];
                    $sql4 = "UPDATE admin SET color = '{$color}' WHERE uniqueid = {$receptor}";
                    $query4 = mysqli_query($conn, $sql4);
                    $sql5 = "UPDATE users SET encargadoid = {$receptor}, color = '{$color}' WHERE uniqueid = {$iduser}";
                    $query5 = mysqli_query($conn, $sql5);
                    $output = "reasignar color";
                }
            }
        }
    }
    
    echo $output;
    
}else{
    header("location: ../login.php");
}    

?>