<!--Crear usuario para la base de datos-->
<?php
$user = isset($_POST["user"]) ? $_POST["user"] : "";
$uniqueid = isset($_POST["uniqueid"]) ? $_POST["uniqueid"] : "";
$correo = isset($_POST["correo"]) ? $_POST["correo"] : "";
$contraseña = isset($_POST["contraseña"]) ? $_POST["contraseña"] : "";
try{
    $connection = new PDO("mysql:host=localhost; port=3306; dbname=chat", "root", ""); 
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    $pdo = $connection->prepare('INSERT INTO users(idunique, username, correo, contraseña) VALUES (?, ?, ?, ?)');
    $pdo->bindParam(1,$uniqueid);
    $pdo->bindParam(2,$user);
    $pdo->bindParam(3,$correo);
    $pdo->bindParam(4,$contraseña);
    $pdo->execute() or die(print($pdo->errorInfo()));

    echo json_encode('true');


}catch(PDOException $e){
    echo $e->getMessage();
    die();
}
?>  