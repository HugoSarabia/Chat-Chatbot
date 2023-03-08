<!--Manda un correo electrónico al correo especificado-->
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


/* Clase para tratar con excepciones y errores */
require 'C:\xampp\htdocs\VSC PHP\PHPMailer\src\Exception.php';
/* Clase PHPMailer */
require 'C:\xampp\htdocs\VSC PHP\PHPMailer\src\PHPMailer.php';
/*Clase SMTP necesaria para conectarte a un servidor SMTP */
require 'C:\xampp\htdocs\VSC PHP\PHPMailer\src\SMTP.php';


$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.office365.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'example@hotmail.com';                     //SMTP username
    $mail->Password   = 'password';                               //SMTP password
    $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
    $mail->Port       = 587;      
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';                              //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('example@hotmail.com', 'Hugh Jackman');
    $mail->addAddress('example@hotmail.com', 'Paul Starr');     //Add a recipient   //Optional name

    //Content
    //$mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Este es un asunto';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo "success";
    exit;
    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>