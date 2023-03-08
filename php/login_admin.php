<!--Inicio de sesión del chat de soporte-->
<?php
session_start();
include_once "config.php";
$user = mysqli_real_escape_string($conn, $_POST['user']);
$contraseña = mysqli_real_escape_string($conn, $_POST['contraseña']);

if(!empty($user) && !empty($contraseña)){
    $sql = mysqli_query($conn, "SELECT * FROM admin WHERE username = '{$user}'");
    if(mysqli_num_rows($sql) > 0){
        $row = mysqli_fetch_assoc($sql);
        $user_pass = md5($contraseña);
        $enc_pass = $row['contraseña'];
        $_SESSION['uniqueid'] = $row['uniqueid'];
        $sql2 = mysqli_query($conn, "UPDATE admin SET status = 'online' WHERE  username = '{$user}'");
        echo "success";

    }else{
        echo "$user - This email not Exist!";
    }
}else{
    echo "All input fields are required!";
}

?>