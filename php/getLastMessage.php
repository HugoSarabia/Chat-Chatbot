<!--Recuperar el último mensaje del cliente para usarlo en la notificación-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $output = [];
    $sql = "SELECT * FROM mensajes WHERE visto = 1 ORDER BY msj_id DESC LIMIT 1;";
    $query = mysqli_query($conn, $sql);
    if(mysqli_num_rows($query) > 0){
        while($row = mysqli_fetch_assoc($query)){
            $sql2 = "SELECT * FROM users WHERE uniqueid = {$row['receptor_msj_id']}";
            $query2 = mysqli_query($conn, $sql2);
            $row2 = mysqli_fetch_assoc($query2);
            $output[] = [
                'uniqueid' => $row2['uniqueid'],
                'username' => $row2['username'],
                'msj' => $row['msj']
            ];
        }
    }
    echo json_encode($output);
}else{
    header("location: ../login.php");
}    
?>