<!--Inicio de sesión del chat del cliente-->
<?php
session_start();
include_once "config.php";
$correo = isset($_POST["correo"]) ? $_POST["correo"] : "";
$contraseña = isset($_POST["contraseña"]) ? $_POST["contraseña"] : "";
try {
    if(!empty ($correo) && !empty ($contraseña)){
        $sql = mysqli_query ($conn, "SELECT * FROM users WHERE correo = '{$correo}' AND contraseña = '{$contraseña}'");
       if(mysqli_num_rows($sql) >0){ 
           $row = mysqli_fetch_assoc($sql);
           $_SESSION['uniqueid'] = $row['uniqueid'];
           echo "success";
       }else{
           echo "Email or Password is incorrect!";}
       }else{
       echo "All input fields are required!";
   }

} catch (PDOException $e) {
    echo $e->getMessage();
    die();
}

?>