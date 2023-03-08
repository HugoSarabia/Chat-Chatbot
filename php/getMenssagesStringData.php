<!--Recuperar datos del mensaje del chatbot en forma de etiquetas html-->
<?php
include_once "config.php";
$output = "";
$values = array();
$duplicate_found = false;
$sql = "SELECT * FROM opcion";
$query = mysqli_query($conn, $sql);
$sql2 = "SELECT * FROM mensaje ORDER BY idmensaje";
$query2 = mysqli_query($conn, $sql2);
if(mysqli_num_rows($query2) > 0){
    while($row2 = mysqli_fetch_assoc($query2)){
        $output .= '<option value="'.$row2['idmensaje'].'">'.$row2['mensaje'].'</option>';
    }
}
echo $output;
?>