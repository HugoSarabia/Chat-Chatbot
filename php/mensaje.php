<!--Consulta de datos para recuperar los mensajes respuesta del chatbot-->
<?php
header("Access-Control-Allow-Origin: ./mensaje.php");
try{
    $connection = new PDO("mysql:host=localhost; port=3306; dbname=chat", "root", ""); 
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    $res = $connection->query("SELECT * FROM mensaje") or die(print($connection->errorInfo()));

    $data = [];

    while($item = $res->fetch(PDO::FETCH_OBJ)){
        $data[] = [
            'idmensaje' => $item->idmensaje,
            'mensaje' => $item->mensaje,
            'id_respuestapara' => $item->id_respuestapara,
            'id_respuestade' => $item->id_respuestade
        ];
    }

    echo json_encode($data);
}catch(PDOException $e){
    echo $e->getMessage();
    die();
}
?>