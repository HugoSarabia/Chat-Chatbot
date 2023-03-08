<!--Despliegue de mensajes al DOM del lado del Chatbot-->
<?php
session_start();
if(isset($_SESSION['uniqueid'])){
    include_once "config.php";
    $receptor = $_SESSION['uniqueid'];
    $emisor = mysqli_real_escape_string($conn, $_POST['emisor_msj_id']);
    $output = "";
    $sql = "SELECT * FROM mensajes LEFT JOIN admin ON admin.uniqueid = mensajes.receptor_msj_id 
    WHERE (receptor_msj_id = {$receptor} OR emisor_msj_id = {$receptor}) ORDER BY msj_id DESC LIMIT 1";
    $query = mysqli_query($conn, $sql);
    if(mysqli_num_rows($query) > 0){
        while($row = mysqli_fetch_assoc($query)){
            if(preg_match('/(\.jpg|\.jpeg|\.png|\.bmp|\.tif|\.jfif|\.pjp|\.apng|\.ico|\.tiff|\.gif|\.svg|\.webp|\.xbm|\.jxl|\.svgz|\.pjpeg|\.avif|\.JPG|\.JPEG|\.PNG|\.BMP|\.TIF|\.JFIF|\.PJP|\.APNG|\.ICO|\.TIFF|\.GIF|\.SVG|\.WEBP|\.XBM|\.JXL|\.SVGZ|\.PJPEG|\.AVIF)$/', $row['msj']) && file_exists('../chat_imgs/'.$row["msj"]) && $row['tipo'] == "imagen") {
                $imageURL = './chat_imgs/'.$row["msj"];
                if($row['receptor_msj_id'] === $receptor){
                    $output .= '
                    <div class="bubble-chat-container-left">
                    <div class="download-button">
                    <a href="'.$imageURL.'" download>
                        <i class="fa fa-download fa-2x" aria-hidden="true"></i>
                    </a>
                </div>
                <div class="chat-bubble-img-emisor">
                    <img class="chat-bubble-img" src="'.$imageURL.'"/>
                </div>
                        
                    </div>';
                }else{
                    $output .= '
                <div class="bubble-chat-container-left">
                    <div class="chat-bubble-bot-img">
                        <div class="chat-bubble-img-emisor">
                            <a class="open-new-window "href="'.$imageURL.'" target="_blank">
                                <img class="chat-bubble-img" src="'.$imageURL.'"/>
                            </a>
                        </div>
                    </div>
                    <div class="download-button">
                        <a href="'.$imageURL.'" download>
                            <i class="fa fa-download fa-2x" aria-hidden="true"></i>
                        </a>
                    </div>    
                </div>';
                }
            }else{
                if(filter_var($row['msj'], FILTER_VALIDATE_URL)){
                    if($row['receptor_msj_id'] === $receptor){
                        $output .= '
                        <div class="bubble-chat-container-right">
                                <div class="chat-bubble-right">
                                    <p class="chat-bubble-text">
                                        <a target="_blank" rel="noopener noreferrer" href="'.$row['msj'].'">'.$row['msj'].'</a>
                                    </p>
                                </div>
                    ';
                    }else{
                        $output .= '
                        <div class="bubble-chat-container-left">
                            <div class="chat-bubble-bot">
                                <p class="chat-bubble-text">
                                    <a target="_blank" rel="noopener noreferrer" href="'.$row['msj'].'">'.$row['msj'].'</a>
                                </p>
                            </div>
                        </div>
                        ';
                    }
                }else{
                    if($row['receptor_msj_id'] === $receptor){
                        $output .= '
                        <div class="bubble-chat-container-right">
                                <div class="chat-bubble-right">
                                    <p class="chat-bubble-text">'.$row['msj'].'</p>
                                </div>
                    ';
                    }else{
                        $output .= '
                        <div class="bubble-chat-container-left">
                            <div class="chat-bubble-bot">
                                <p class="chat-bubble-text">'.$row['msj'].'</p>
                            </div>
                        </div>
                        ';
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