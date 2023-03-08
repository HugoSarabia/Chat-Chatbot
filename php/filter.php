<!--Filtrar lista de usuarios por color mensajes no leidos-->
<?php
    session_start();
    include_once( "config.php" );
    $receptor = $_SESSION['uniqueid'];
    $filter = mysqli_real_escape_string($conn, $_POST['filter']);
    $output = "";
    if($filter == 1){
        $sql = mysqli_query( $conn, "SELECT *, 
        (SELECT msj_id FROM mensajes sc 
        WHERE sc.emisor_msj_id = s.uniqueid OR sc.receptor_msj_id = s.uniqueid ORDER BY msj_id DESC LIMIT 1) AS msj_id
        FROM users s WHERE leido = 1 ORDER BY msj_id DESC;");
        if(mysqli_num_rows($sql) > 0){
            include_once "data.php";
        }else{
            $output .= 'Error1';
        }
    }else if($filter == 2){
        $sql = mysqli_query( $conn, "SELECT * FROM users WHERE color is NOT NULL ORDER BY color");
        if(mysqli_num_rows($sql) > 0){
            include_once "data.php";
        }else{
            $output .= 'Error2';
        }
    }

    echo $output;
?>