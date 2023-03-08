<!--Mostrar datos de la opción a editar-->
<?php
include_once "config.php";
$output = [];
$output2 = [];
$output3 = [];
$idopcion = mysqli_real_escape_string($conn, $_POST['idopcion']);
$sql = "SELECT * FROM opcion WHERE idopcion = {$idopcion}";
$query = mysqli_query($conn, $sql);
if(mysqli_num_rows($query) > 0){
    while($row = mysqli_fetch_assoc($query)){
        $output = [
            'idopcion' => $row['idopcion'],
            'opcion' => $row['opcion'],
            'tipo' => $row['tipo'],
            'id_mensaje_respondido' => $row['id_respuestade'],
            'id_mensaje_a_mostrar' => $row['id_respuestapara']
        ];
    }
}

if(is_null($output['id_mensaje_respondido'])){
    $output[ 'id_mensaje_respondido'] = "NULL";
    $sql2 = "SELECT * FROM mensaje ORDER BY CASE WHEN idmensaje = {$output['id_mensaje_respondido']} THEN 1 ELSE 2 END;";
    $query2 = mysqli_query($conn, $sql2);
    if(mysqli_num_rows($query2) > 0){
        while($row2 = mysqli_fetch_assoc($query2)){
            $output += [
                'idmensaje1' => $row2['idmensaje'],
                'mensaje1' => '',
                'id_respuestade' => $row2['id_respuestade'],
                'id_respuestapara' => $row2['id_respuestapara']
            ];
            $output['mensaje1'] .= '<option value="'.$row2['idmensaje'].'">'.$row2['mensaje'].'</option>';
        }
    }
}else{
    $sql2 = "SELECT * FROM mensaje ORDER BY CASE WHEN idmensaje = {$output['id_mensaje_respondido']} THEN 1 ELSE 2 END;";
    $query2 = mysqli_query($conn, $sql2);
    if(mysqli_num_rows($query2) > 0){
        while($row2 = mysqli_fetch_assoc($query2)){
            $output += [
                'idmensaje1' => $row2['idmensaje'],
                'mensaje1' => '',
                'id_respuestade' => $row2['id_respuestade'],
                'id_respuestapara' => $row2['id_respuestapara']
            ];
            $output['mensaje1'] .= '<option value="'.$row2['idmensaje'].'">'.$row2['mensaje'].'</option>';
        }
    }
}

if(is_null($output['id_mensaje_a_mostrar'])){
    $output[ 'id_mensaje_a_mostrar'] = "NULL";
    //$output += [ 'mensaje1' => "NULL" ];
    $sql3 = "SELECT * FROM mensaje ORDER BY CASE WHEN idmensaje = {$output['id_mensaje_a_mostrar']} THEN 1 ELSE 2 END;";
    $query3 = mysqli_query($conn, $sql3);
    if(mysqli_num_rows($query3) > 0){
        while($row3 = mysqli_fetch_assoc($query3)){
            $output += [
                'idmensaje2' => $row3['idmensaje'],
                'mensaje2' => '',
                'id_respuestade' => $row3['id_respuestade'],
                'id_respuestapara' => $row3['id_respuestapara']
            ];
            $output['mensaje2'] .= '<option value="'.$row3['idmensaje'].'">'.$row3['mensaje'].'</option>';
        }
    }
}else{
    $sql3 = "SELECT * FROM mensaje ORDER BY CASE WHEN idmensaje = {$output['id_mensaje_a_mostrar']} THEN 1 ELSE 2 END;";
    $query3 = mysqli_query($conn, $sql3);
    if(mysqli_num_rows($query3) > 0){
        while($row3 = mysqli_fetch_assoc($query3)){
            $output += [
                'idmensaje2' => $row3['idmensaje'],
                'mensaje2' => '',
                'id_respuestade' => $row3['id_respuestade'],
                'id_respuestapara' => $row3['id_respuestapara']
            ];
            $output['mensaje2'] .= '<option value="'.$row3['idmensaje'].'">'.$row3['mensaje'].'</option>';
        }
    }
}
echo json_encode($output);
?>