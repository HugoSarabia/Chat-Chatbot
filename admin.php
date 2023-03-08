<?php
session_start();
if(!isset($_SESSION['uniqueid']) || $_SESSION['uniqueid'] == ''){
    header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Toronja Chat</title>
    <link rel="icon" href="img/favicon.png" type="image/png" sizes="16x16">
    <script src="https://kit.fontawesome.com/bd6bb382c6.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href=".\font-awesome\css\font-awesome.min.css">
    <link rel="stylesheet" href="css/style_admin.css">
    <link rel="stylesheet" href="@sweetalert2/themes/dark/dark.css">
    <script src="node_modules\sweetalert2\dist\sweetalert2.all.min.js"></script>

</head>
<body>
   <?php
    include_once "php/config.php";
    $sql = mysqli_query($conn, "SELECT * FROM admin WHERE uniqueid = {$_SESSION['uniqueid']}");
    if(mysqli_num_rows($sql) > 0){
        $row = mysqli_fetch_assoc($sql);
    }
    ?>
    <div class="container">
        <div class="left-layout">
            <div class="left-layout-header">
                <div class="admin-icon">
                    <i class="fa fa-user-circle fa-3x" aria-hidden="true"></i>
                    <!--1234321 uniqueid-->
                    <span  class="admin-id" hidden><?php echo $row['uniqueid'] ?></span>
                    <button class="prueba">Cerrar sesión</button>
                </div>
            </div>
            <div class="left-layout-searching-bar-div">
                <div class="searching-bar">
                    <input class="search-bar-input" type="text" placeholder="Busca un chat">
                </div>
                <div class="filter">
                    <button title="boton de filtrado" class="filter-icon">
                        <i class="fa fa-filter fa-2x" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div class="chats-container"></div>
                <div id="userDropdown" class="userDropdown">
                    <div id="noLeido">Marcar como no leído</div>
                </div>   
        </div>
        <div class="chat">
            <div class="chat-container">
                <div class="chat-background">
                    <span class="chat-background-text">Bienvenido al Chat de Toronja Lab</span>
                    <img class="chat-background-image" src="img/logo.png" alt="">
                    <span class="chat-background-text">Selecciona un chat para ver los mensajes</span>
                </div>
            </div>
        </div>
    </div>
    <script src="js/admin.js"></script>
</body>
</html>