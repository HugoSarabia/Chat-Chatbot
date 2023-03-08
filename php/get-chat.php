<!--Despliegue de mensajes al DOM del lado de soporte-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $emisor = mysqli_real_escape_string($conn, $_POST['emisor_msj_id']);
    $output = "";
    $sql2 = "SELECT * FROM admin";
    $query2 = mysqli_query($conn, $sql2);
    $sql = "SELECT * FROM mensajes LEFT JOIN admin ON admin.uniqueid = mensajes.receptor_msj_id 
    WHERE (receptor_msj_id = {$emisor}) OR (emisor_msj_id = {$emisor}) ORDER BY msj_id";
    $query = mysqli_query($conn, $sql);
    if(mysqli_num_rows($query) > 0){
        while($row = mysqli_fetch_assoc($query)){
                $tiempo = $row['tiempo_msj'];
                $tiempo = date("h:ia", strtotime($tiempo));
                if($row['tipo'] == "alerta"){
                    $output .= '<div class="div-alert">
                    '.$row['msj'].'
                    </div>'; 
                }else{
                    if(preg_match('/(\.jpg|\.jpeg|\.png|\.bmp|\.tif|\.jfif|\.pjp|\.apng|\.ico|\.tiff|\.gif|\.svg|\.webp|\.xbm|\.jxl|\.svgz|\.pjpeg|\.avif|\.JPG|\.JPEG|\.PNG|\.BMP|\.TIF|\.JFIF|\.PJP|\.APNG|\.ICO|\.TIFF|\.GIF|\.SVG|\.WEBP|\.XBM|\.JXL|\.SVGZ|\.PJPEG|\.AVIF)$/', $row['msj']) && file_exists('../chat_imgs/'.$row["msj"]) && $row['tipo'] == 'imagen') {
                        $imageURL = './chat_imgs/'.$row["msj"];
                        if($row['receptor_msj_id'] === $row['uniqueid']){
                            $output .= '
                            <div class="bubble-chat-container-right">
                                <div class="download-button">
                                    <a href="'.$imageURL.'" download>
                                        <i class="fa fa-download fa-2x" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="chat-bubble-img-emisor">
                                    <span class="emisor-name" style="color:'.$row['color'].'">'.$row['username'].'</span>
                                    <img class="chat-bubble-img" src="'.$imageURL.'"/>
                                    <div class="img-gradient-shadow"></div>
                                    <div class="absolute-time-div">
                                        <span class="message-time" style="color: rgba(var(--inverse-rgb),.9) !important;">'.$tiempo.'</span>
                                    </div>
                                </div>
                            </div>';
                        }else{
                            $output .= '<div class="chat-bubble-img-emisor">
                            <img class="chat-bubble-img" src="'.$imageURL.'"/>
                            <span class="message-time">'.$tiempo.'</span>
                            </div>';
                        }
                    }else{
                        if(filter_var($row['msj'], FILTER_VALIDATE_URL)){
                            if($row['receptor_msj_id'] === $row['uniqueid']){
                                $output .= '<div class="chat-bubble-emisor">
                                <span class="emisor-name" style="color:'.$row['color'].'">'.$row['username'].'</span>
                                <span class="chat-bubble-emisor-text">
                                    <a class="url-chat" target="_blank" rel="noopener noreferrer" href="'.$row['msj'].'">'.$row['msj'].'</a>
                                </span>
                                <div class="container-message-time">
                                <span class="message-time">'.$tiempo.'</span>
                            </div>
                            </div>';
                            }else{
                                $output .= '<div class="chat-bubble-receptor">
                                <span class="chat-bubble-receptor-text">
                                    <a class="url-chat" target="_blank" rel="noopener noreferrer" href="'.$row['msj'].'">'.$row['msj'].'</a>
                                </span>
                                <div class="container-message-time">
                                <span class="message-time">'.$tiempo.'</span>
                            </div>
                            </div>';
                            }
                        }else{
                            if($row['receptor_msj_id'] === $row['uniqueid']){
                                $output .= '<div class="chat-bubble-emisor">
                                    <span class="emisor-name" style="color:'.$row['color'].'">'.$row['username'].'</span>
                                    <span class="chat-bubble-emisor-text">'.$row['msj'].'</span>
                                    <div class="container-message-time">
                                        <span class="message-time">'.$tiempo.'</span>
                                    </div>
                                </div>';
                            }else{
                                $output .= '<div class="chat-bubble-receptor">
                                <span class="chat-bubble-receptor-text">'.$row['msj'].'</span>
                                <div class="container-message-time">
                                        <span class="message-time">'.$tiempo.'</span>
                                </div>
                            </div>';
                            }
                        }
                    }
                }
            }
        
    }else{
        $output .= '<div class="text">No hay mensajes disponibles. Una vez que envíe el mensaje, aparecerá aquí.</div>';
    }
    echo $output;

}else{
    header("location: ../login.php");
}
?>