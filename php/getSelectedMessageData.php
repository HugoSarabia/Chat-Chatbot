<!--Mostrar datos del mensaje a editar-->
<?php
include_once "config.php";
$output = [];
$output2 = [];
$output3 = [];
$idmensaje = mysqli_real_escape_string($conn, $_POST['idmensaje']);
$sql = "SELECT * FROM mensaje WHERE idmensaje = {$idmensaje}";
$query = mysqli_query($conn, $sql);
if(mysqli_num_rows($query) > 0){
    while($row = mysqli_fetch_assoc($query)){
        $output = [
            'idmensaje' => $row['idmensaje'],
            'mensaje' => $row['mensaje'],
            'id_opcion_siguiente' => $row['id_respuestapara'],
            'id_opcion_pasada' => $row['id_respuestade']
        ];
    }
}

if(is_null($output['id_opcion_siguiente'])){
    $output[ 'id_opcion_siguiente'] = "NULL";
    //$output += [ 'mensaje1' => "NULL" ];
    $sql2 = "SELECT * FROM opcion ORDER BY CASE WHEN idopcion = {$output['id_opcion_siguiente']} THEN 1 ELSE 2 END;";
    $query2 = mysqli_query($conn, $sql2);
    if(mysqli_num_rows($query2) > 0){
        while($row2 = mysqli_fetch_assoc($query2)){
            $output += [
                'idopcion1' => $row2['idopcion'],
                'opcion1' => '',
                'id_respuestade' => $row2['id_respuestade'],
                'id_respuestapara' => $row2['id_respuestapara']
            ];
            $output['opcion1'] .= '<option value="'.$row2['idopcion'].'">'.$row2['opcion'].'</option>';
        }
    }
}else{
    $sql2 = "SELECT * FROM opcion ORDER BY CASE WHEN idopcion = {$output['id_opcion_siguiente']} THEN 1 ELSE 2 END;";
    $query2 = mysqli_query($conn, $sql2);
    if(mysqli_num_rows($query2) > 0){
        while($row2 = mysqli_fetch_assoc($query2)){
            $output += [
                'idopcion1' => $row2['idopcion'],
                'opcion1' => '',
                'id_respuestade' => $row2['id_respuestade'],
                'id_respuestapara' => $row2['id_respuestapara']
            ];
            $output['opcion1'] .= '<option value="'.$row2['idopcion'].'">'.$row2['opcion'].'</option>';
        }
    }
}

if(is_null($output['id_opcion_pasada'])){
    $output[ 'id_opcion_pasada'] = "NULL";
    $sql3 = "SELECT * FROM opcion ORDER BY CASE WHEN idopcion = {$output['id_opcion_pasada']} THEN 1 ELSE 2 END;";
    $query3 = mysqli_query($conn, $sql3);
    if(mysqli_num_rows($query3) > 0){
        while($row3 = mysqli_fetch_assoc($query3)){
            $output += [
                'idopcion2' => $row3['idopcion'],
                'opcion2' => '',
                'id_respuestade' => $row3['id_respuestade'],
                'id_respuestapara' => $row3['id_respuestapara']
            ];
            $output['opcion2'] .= '<option value="'.$row3['idopcion'].'">'.$row3['opcion'].'</option>';
        }
    }
}else{
    $sql3 = "SELECT * FROM opcion ORDER BY CASE WHEN idopcion = {$output['id_opcion_pasada']} THEN 1 ELSE 2 END;";
    $query3 = mysqli_query($conn, $sql3);
    if(mysqli_num_rows($query3) > 0){
        while($row3 = mysqli_fetch_assoc($query3)){
            $output += [
                'idopcion2' => $row3['idopcion'],
                'opcion2' => '',
                'id_respuestade' => $row3['id_respuestade'],
                'id_respuestapara' => $row3['id_respuestapara']
            ];
            $output['opcion2'] .= '<option value="'.$row3['idopcion'].'">'.$row3['opcion'].'</option>';
        }
    }
}
echo json_encode($output);
?>