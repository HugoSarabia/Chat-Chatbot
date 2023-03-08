<!--Busca entre la base de datos un usuario que coincida con la cadena-->
<?php
    session_start();
    include_once( "config.php" );
    $receptor = $_SESSION['uniqueid'];
    $searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);
    $output = "";
    $sql = mysqli_query( $conn, "SELECT * FROM users WHERE NOT uniqueid = {$receptor} AND (username LIKE '%{$searchTerm}%') " );
    if(mysqli_num_rows($sql) > 0){
        include_once "data.php";
    }else{
        $output .= 'Error';
    }
    echo $output;
?>