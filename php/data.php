<!--Despliegue de la lista de chats con sus perzonalizaciones(detalles)-->
<?php
    while($row = mysqli_fetch_assoc($sql)){
        $sql5 = "SELECT *, (SELECT color FROM admin sc 
        WHERE sc.uniqueid = s.encargadoid ORDER BY uniqueid DESC LIMIT 1) 
        AS color FROM users s ORDER BY color DESC";
        $query5 = mysqli_query($conn, $sql5);
        $row5 = mysqli_fetch_assoc($query5);
                
        $sql2 = "SELECT * FROM mensajes LEFT JOIN admin ON admin.uniqueid = mensajes.receptor_msj_id 
        WHERE (receptor_msj_id = {$row['uniqueid']} OR emisor_msj_id = {$row['uniqueid']}) ORDER BY msj_id DESC LIMIT 1";
        $query2 = mysqli_query($conn, $sql2);
        $row2 = mysqli_fetch_assoc($query2);
    
        $sql3 = "SELECT COUNT(*) FROM mensajes WHERE (visto = 1 AND receptor_msj_id = {$row['uniqueid']})";
        $query3 = mysqli_query($conn, $sql3);
        $row3 = mysqli_fetch_assoc($query3);
    
        $sql6 = "SELECT * FROM users WHERE uniqueid = {$row['uniqueid']}";
        $query6 = mysqli_query($conn, $sql6);
        $row6 = mysqli_fetch_assoc($query6);
        
        $color = $row['color'];
    
        if(mysqli_num_rows($query3) > 0){
            $notifications = $row3['COUNT(*)'];
        }else{
            $notifications = 0;
        }
        if(mysqli_num_rows($query2) > 0){
            $result = $row2['msj'];
            $tiempo = $row2['tiempo_msj'];
            $split = (str_split($tiempo,5));
            $tiempo = date("h:ia", strtotime($tiempo));
            $timeOutput = "";
    
            date_default_timezone_set('America/Mazatlan');
            $fecha = $row2['fecha_msj'];
            $fecha2 = date_create($fecha, timezone_open('America/Mazatlan'));
            $fechaTimestamp = date_timestamp_get($fecha2);
            $Date = date('Y-m-d',$fechaTimestamp);
            $FirstDay = date("Y-m-d", strtotime('sunday last week'));
            $LastDay = date("Y-m-d", strtotime('sunday this week'));
            if($fecha > $FirstDay && $fecha < $LastDay) {
                if($Date == date('Y-m-d')) {
                    $timeOutput = $tiempo;
                  }
                  elseif($Date == date('Y-m-d',time() - (24 * 60 * 60))) {
                    $timeOutput = "Ayer";
                    }else{
                        $timestamp = strtotime($Date);
                        $day = date('D', $timestamp);
                        $day = date('l', $timestamp);
                        if($day == "Sunday"){
                            $timeOutput = "Domingo";
                        }elseif ($day == "Monday") {
                            $timeOutput = "Lunes";
                        }elseif($day == "Thuesday"){
                            $timeOutput = "Martes";
                        }elseif($day == "Wednesday"){
                            $timeOutput = "Miércoles";
                        }elseif($day == "Thursday"){
                            $timeOutput = "Jueves";
                        }elseif($day == "Friday"){
                            $timeOutput = "Viernes";
                        }elseif($day == "Saturday"){
                            $timeOutput = "Sábado";
                        }
                    }
             } else {
                $timeOutput = date('d/m/Y',$fechaTimestamp);  
             } 
        }else{
            $result = "No hay mensajes disponibles.";
            $timeOutput = " ";
        }
        $sql4 = "SELECT * FROM admin WHERE  uniqueid = {$receptor}";
        $query4 = mysqli_query($conn, $sql4);
        $row4 = mysqli_fetch_assoc($query4);
        if(preg_match('/(\.jpg|\.jpeg|\.png|\.bmp|\.tif|\.jfif|\.pjp|\.apng|\.ico|\.tiff|\.gif|\.svg|\.webp|\.xbm|\.jxl|\.svgz|\.pjpeg|\.avif|\.JPG|\.JPEG|\.PNG|\.BMP|\.TIF|\.JFIF|\.PJP|\.APNG|\.ICO|\.TIFF|\.GIF|\.SVG|\.WEBP|\.XBM|\.JXL|\.SVGZ|\.PJPEG|\.AVIF)$/', $result) && $row2['tipo'] == 'imagen' && file_exists('../chat_imgs/'.$row2["msj"])){
            $msg = "Imagen 📷";
        }else{
            (strlen($result) > 35) ? $msg = substr($result, 0, 35).'...' : $msg = $result;
        }
        if($row2['receptor_msj_id'] == $row2['uniqueid']){
            $you = $row2['username'].": ";
        }else{
            $you = "";
        }
        isset($row['img'])? $img = '<img class="header-user-profile-pic" src="./img/'.$row['img'].'">' : $img = '<i class="fa fa-user-circle fa-3x" aria-hidden="true"></i>';
        if($notifications == 0){
            if($row6['leido'] == 1){
                $output .= '
                <div class="chat-box dropdown" id="'.$row['uniqueid'].'">
                    <div class="chat-box-left">
                        <div class="chat-box-user-icon">
                            '.$img.'
                        </div>
                    </div>
                    <div class="chat-box-center">
                        <div class="top-div-chat-box">  
                            <div class="chat-box-user-name">'.$row['username'].'</div>
                            <div class="admin-color" id="'.$row['uniqueid'].'2" style="background-color:'.$color.'">‎</div>
                            <input type="color" class="coloris" id="'.$row['uniqueid'].'1"/>
                            <div class="chat-box-message-time">'.$timeOutput.'</div>
                        </div>
                        <div class="bot-div-chat-box">
                            <div class="chat-box-user-message">
                            '.$you . $msg.'
                            </div>
                            <div class="chat-options-container">
                            <div class="chat-box-new-message">
                                <span class="new-message-number">‎</span>
                            </div>
                            </div>
                        </div>
                    </div>
        
                </div>
                ';
            }else{
                $output .= '
                <div class="chat-box dropdown" id="'.$row['uniqueid'].'">
                    <div class="chat-box-left">
                        <div class="chat-box-user-icon">
                            '.$img.'
                        </div>
                    </div>
                    <div class="chat-box-center">
                        <div class="top-div-chat-box">  
                            <div class="chat-box-user-name">'.$row['username'].'</div>
                            <div class="admin-color" id="'.$row['uniqueid'].'2" style="background-color:'.$color.'">‎</div>
                            <input type="color" class="coloris" id="'.$row['uniqueid'].'1"/>
                            <div class="chat-box-message-time">'.$timeOutput.'</div>
                        </div>
                        <div class="bot-div-chat-box">
                            <div class="chat-box-user-message">
                            '.$you . $msg.'
                            </div>
                            <div class="chat-options-container">
                            </div>
                        </div>
                    </div>
        
                </div>
                ';
            }
        }else{
           $sql7 = mysqli_query($conn, "UPDATE users SET leido = 1 WHERE leido = 0 AND uniqueid = {$row['uniqueid']}");
            $output .= '
            <div class="chat-box" id="'.$row['uniqueid'].'">
            <div class="chat-box-left">
                <div class="chat-box-user-icon">
                    '.$img.'
                </div>
            </div>
            <div class="chat-box-center">
                <div class="top-div-chat-box">  
                    <div class="chat-box-user-name">'.$row['username'].'</div>
                    <div class="admin-color" id="'.$row['uniqueid'].'2" style="background-color:'.$color.'">‎</div>
                    <input type="color" class="coloris" id="'.$row['uniqueid'].'1"/>
                    <div class="chat-box-message-time">'.$timeOutput.'</div>
                </div>
                <div class="bot-div-chat-box">
                    <div class="chat-box-user-new-message">
                       '.$you . $msg.'
                    </div>
                    <div class="chat-options-container">
                        <div class="chat-box-new-message">
                            <span class="new-message-number">'.$notifications.'</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            ';
        }
    }


?>