<!--Conexión a la base de datos-->
<?php
$conn = mysqli_connect("localhost", "root", "", "chat");
if(!$conn){
    die("Connection failed: ".mysqli_connect_error());
}
?>