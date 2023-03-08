<!--Recuperar datos del mensaje del chatbot-->
<?php
include_once "config.php";
$output = [];
$sql = "SELECT * FROM mensaje ORDER BY idmensaje";
$query = mysqli_query($conn, $sql);
if(mysqli_num_rows($query) > 0){
    while($row = mysqli_fetch_assoc($query)){
        $output[] = [
            'idmensaje' => $row['idmensaje'],
            'mensaje' => $row['mensaje'],
            'id_opcion_siguiente' => $row['id_respuestapara'],
            'id_opcion_pasada' => $row['id_respuestade']
        ];
    }
}
echo json_encode($output);

?>