<!--Recuperar datos de la opcion del chatbot-->
<?php
include_once "config.php";
$output = [];
$sql = "SELECT * FROM opcion ORDER BY idopcion";
$query = mysqli_query($conn, $sql);
if(mysqli_num_rows($query) > 0){
    while($row = mysqli_fetch_assoc($query)){
        $output[] = [
            'idopcion' => $row['idopcion'],
            'opcion' => $row['opcion'],
            'tipo' => $row['tipo'],
            'id_mensaje_respondido' => $row['id_respuestade'],
            'id_mensaje_a_mostrar' => $row['id_respuestapara']
        ];
    }
}
echo json_encode($output);
?>