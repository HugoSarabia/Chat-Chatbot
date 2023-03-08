<!--Actualizar estado de conexión de soporte-->
<?php
    session_start();
    if(isset($_SESSION['uniqueid'])){
        include_once "config.php";
        $logout_id = mysqli_real_escape_string($conn, $_POST['logout_id']);
        if(isset($logout_id)){
            $status = "offline";
            $sql = mysqli_query($conn, "UPDATE admin SET status = '{$status}' WHERE uniqueid={$logout_id}");
            if($sql){
                echo "success";
                session_unset();
                session_destroy();
            }
        }
    }else{  
        header("location: ../login.php");
    }
?>