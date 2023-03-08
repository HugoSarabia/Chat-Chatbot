<!--Despliegue de la vista del chat del usuario del lado de soporte-->
<?php
session_start();
include_once "config.php";
$userID = $_COOKIE['userID'];
$adminID = $_COOKIE['adminID'];
$sql = mysqli_query($conn, "SELECT * FROM users WHERE uniqueid = $userID");
$output ="";
$row = mysqli_fetch_assoc($sql);

$sql2 = "SELECT * FROM mensajes WHERE  (emisor_msj_id = {$adminID} AND receptor_msj_id = {$userID})";
$query2 = mysqli_query($conn, $sql2);
$row2 = mysqli_fetch_assoc($query2);

$sql3 = "SELECT * FROM mensajes LEFT JOIN admin ON admin.uniqueid = mensajes.receptor_msj_id
WHERE (receptor_msj_id = {$adminID} AND emisor_msj_id = {$userID})
OR (receptor_msj_id = {$userID} AND emisor_msj_id = {$adminID}) ORDER BY msj_id";
$query3 = mysqli_query($conn, $sql3);
$row3 = mysqli_fetch_assoc($query3);
//error_reporting(E_ERROR | E_PARSE);

isset($row['img'])? $img = '<img class="header-user-profile-pic" src="./img/'.$row['img'].'">' : $img = '<i class="fa fa-user-circle fa-3x" aria-hidden="true"></i>';

if(isset($row3['msj'])){
    if(preg_match('/(\.jpg|\.jpeg|\.png|\.bmp|\.tif|\.jfif|\.pjp|\.apng|\.ico|\.tiff|\.gif|\.svg|\.webp|\.xbm|\.jxl|\.svgz|\.pjpeg|\.avif|\.JPG|\.JPEG|\.PNG|\.BMP|\.TIF|\.JFIF|\.PJP|\.APNG|\.ICO|\.TIFF|\.GIF|\.SVG|\.WEBP|\.XBM|\.JXL|\.SVGZ|\.PJPEG|\.AVIF)$/', $row3['msj'])){
        $flag = true;
    }else{
        $flag = false;
    }
}else{
    $flag = false;
}

if ($flag && file_exists('../chat_imgs/'.$row3["msj"])) {
    $imageURL = './chat_imgs/'.$row3["msj"];
}

if(mysqli_num_rows($sql) == 1){
        $sql4 = mysqli_query($conn, "UPDATE mensajes SET visto = 0 WHERE visto = 1 AND (receptor_msj_id = {$userID})");
       $sql5 = mysqli_query($conn, "UPDATE users SET leido = 0 WHERE leido = 1 AND uniqueid = {$userID}");
        $output .= '
    <div class="chat-header">
                    <div class="left-header-content">
                        <div class="user-icon">
                            '.$img.'
                            <div class="user-profile-container">
                                <div class="close-user-profile">
                                    <buttom class="close-user-profile-button">
                                        <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                                    </buttom>
                                </div>

                                <div class="user-profile-img">
                                    <img class="user-profile-img" src="./img/'.$row['img'].'" alt="user profile picture">
                                </div>
                                <div class="user-profile-info">
                                    <span class="profile-info-text">Nombre</span>
                                    <span class="user-profile-name-text">'.$row['username'].'</span>
                                </div>
                                <div class="user-profile-info">
                                    <span class="profile-info-text">Correo</span>
                                    <span class="user-profile-email-text">'.$row['correo'].'</span>
                                </div>
                                <div class="user-profile-info">
                                    <span class="profile-info-text">ID</span>
                                    <span class="user-profile-email-text">'.$row['uniqueid'].'</span>
                                </div>
                            </div>
                        </div>
                        <div class="user-name">
                            <span class="user-name-text">'.$row['username'].'</span>
                        </div>
                    </div>
                    <div class="right-header-content">
                            <div class="search-message-button message">
                                <button class="search-icon">
                                    <i class="fa fa-search fa-2x" aria-hidden="true"></i>
                                </button>
                                <div class="search-message-container">
                                    <div class="input-container">
                                        <input class="search-message-input" placeholder="Buscar en el chat">
                                        <span class="search-results"></span>
                                    </div>
                                    <div class="next-message-searched">
                                        <button class="next-message-searched-button">
                                            <i class="fa fa-angle-up fa-2x" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div class="previous-message-searched">
                                        <button class="previous-message-searched-button">
                                            <i class="fa fa-angle-down fa-2x" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div class="vertical-line"></div>
                                    <div class="close-search-container">
                                        <button class="close-search-button">
                                            <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="option-icon-container dropdown">
                                <button class="option-icon-header">
                                    <i class="fa fa-ellipsis-h fa-2x  fa-rotate-90" aria-hidden="true"></i>
                                </button>
                                <div id="myDropdown" class="dropdown-content">
                                    <div id="desconectar">Desconectar chat</div>
                                    <div id="editar">Editar contacto</div>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="chat-content">
                    <div class="bubble-chat-container">
                    </div>

                        <div class="div-scroll-bottom">
                            <button class="btn-scroll-bottom">
                                <i class="fa fa-angle-down fa-2x" aria-hidden="true"></i>
                            </button>
                        </div>

                    <div class="update-form">
                        <div class="header-update-form">
                            <div class="close-update-form">
                                <button class="btn-close-update-form">
                                    <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="header-update-form-text">
                                <span>Actualizar información</span>
                            </div>
                        </div>
                        <div class="body-update-form">
                            <div class="update-form-img">
                                <img class="user-img-form" src="./img/'.$row['img'].'" alt="user profile picture">
                                <input class="input-select-file" type="file" name="file" accept="image/*" enctype=”multipart/form-data”/>
                                <button class="btn-update-form-img" title="Editar">
                                    <i class="fa fa-pencil fa-2x" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="update-form-input">
                                <div class="update-form-input-text">
                                    <span>Nombre</span>
                                </div>
                                <div class="update-form-input-input">
                                    <input class="input-form-class" type="text" name="name" id="name" value="'.$row['username'].'">
                                </div>
                            </div>
                            <div class="update-form-btn">
                                <button class="btn-update-form">Actualizar</button>
                            </div>
                        </div>
                    </div>

                    <div class="image-message-open">
                        <div class="donwload-div">
                            <button class="btn-close-img" type="button">
                                <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                            </button>
                            <a class="btn-download" download href"">
                                <i class="fa fa-download fa-2x" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div class="image-message-open-content">
                            <img class="img-open-preview" src="" alt="">
                        </div>
                    </div>
                    <div class="image-preview">
                        <img class="file-preview">
                        <div class="close-n-send-container">
                            <div class="close-btn-div">
                                <button class="btn-close-img-preview" type="button">
                                    <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="send-img-div">
                                <button class="btn-send-img">
                                    <i class="fa fa-paper-plane fa-2x" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-footer">
                    <div class="left-footer-div">
                        <div class="files">
                        <input class="fileid" type="file" name="file" accept="image/*" enctype=”multipart/form-data”/>
                            <button class="files-icon">
                                <i class="fa fa-paperclip fa-2x" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div class="center-footer-div">
                        <form action="#" class="form-chat">
                        <input type="text" class="emisor_msj_id" name="emisor_msj_id" value="'.$row['uniqueid'].'" hidden>
                        <input type="text" name="mensaje" class="input-chat" placeholder="Escribe tu mensaje aquí..." autocomplete="off">
                        <button class="send"><i class="fa fa-paper-plane fa-2x" aria-hidden="true"></i></button>
                      </form>
                    </div>
                </div>
    ';
}elseif(mysqli_num_rows($sql) < 1){
    echo "Error: No se encontró el usuario";
}
echo $output;
?>