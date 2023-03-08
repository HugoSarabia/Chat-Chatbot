<!--Consulta de datos para recuperar las opciones del chatbot-->
<?php
header("Access-Control-Allow-Origin: ./consulta.php");
try{
    $connection = new PDO("mysql:host=localhost; port=3306; dbname=chat", "root", ""); 
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    $res = $connection->query("SELECT * FROM opcion") or die(print($connection->errorInfo()));

    $data = [];

    while($item = $res->fetch(PDO::FETCH_OBJ)){
        $data[] = [
            'idopcion' => $item->idopcion,
            'opcion' => $item->opcion,
            'tipo' => $item->tipo,
            'id_respuestade' => $item->id_respuestade,
            'id_respuestapara' => $item->id_respuestapara
        ];
    }

    echo json_encode($data);
}catch(PDOException $e){
    echo $e->getMessage();
    die();
}
?>