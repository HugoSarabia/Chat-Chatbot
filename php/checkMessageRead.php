<!--Chequeo de mensajes leídos en el chat-->
<!--'Visto' hace referencia a un mensaje no leído mandado por un usuario-->
<!--'Leido' hace referencia a un mensaje leido pero vuelto a marcar como "no leido"-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $iduser = mysqli_real_escape_string($conn, $_POST['uniqueid']);
    $output ="";
    $sql = "SELECT * FROM users WHERE uniqueid = {$iduser}";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($query);
    $sql2 = "SELECT * FROM mensajes WHERE (receptor_msj_id = {$iduser}) ORDER BY msj_id DESC LIMIT 1";
    $query2 = mysqli_query($conn, $sql2);
    $row2 = mysqli_fetch_assoc($query2);

    if(!isset($row2['visto']) && !isset($row['leido'])){
        //Caso en el que no hay mensajes en el chat
        $output = "desactivado";
    }else if(isset($row2['visto']) && $row2['visto'] == 0 && $row['leido'] == 1){
        //Caso en el que el mensaje esta leido pero se activo el marcado
        $output = "leido";
    }else if(isset($row2['visto']) && $row2['visto'] == 0 && $row['leido'] == 0){
        //Caso en el que el mensaje esta leido
        $output = "no leido";
    }else if(isset($row2['visto']) && $row2['visto'] == 1 && $row['leido'] == 1){
        //Caso en el que el mensaje no esta leido
        $output = "leido";
    }else if(isset($row2['visto']) && $row2['visto'] == 1 && $row['leido'] == 0){
        $output = "leido";
    }
    echo $output;
}else{
    header("location: ../login.php");
}    
?>