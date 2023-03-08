<!--Actualizar datos del cliente-->
<?php
session_start();
include_once "config.php";
 
    $msg = "";
    $receptor = $_SESSION['uniqueid'];
    $emisor = mysqli_real_escape_string($conn, $_POST['emisor_msj_id']);
    date_default_timezone_set('America/Mazatlan');
    $fecha = date('Y-m-d');
    $tiempo = date('H:i:s');
    $read = 1;
    $tipo = "normal";
    isset($_FILES["file"]["name"])? $filename = $_FILES["file"]["name"] : $filename = null;
    isset($_FILES["file"]["tmp_name"])? $tempname = $_FILES["file"]["tmp_name"] : $tempname = null;
    $folder = "../img/" . $filename;
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    
    if(isset($filename)){
        $sql = mysqli_query($conn, "UPDATE users SET username = '{$name}', img = '{$filename}' WHERE uniqueid = $emisor");
        if (move_uploaded_file($tempname, $folder)) {
            echo "success";
        } else {
            echo "fail";
        }
    }else{
        $sql = mysqli_query($conn, "UPDATE users SET username = '{$name}' WHERE uniqueid = $emisor");
        echo "success";
    }


?>