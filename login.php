
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LOGIN</title>
  <script src="https://kit.fontawesome.com/bd6bb382c6.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href=".\font-awesome\css\font-awesome.min.css">
  <link rel="stylesheet" href="css/login.css">
</head>
<body>
  <div class="wrapper">
    <section class="form login">
      <header>Login</header>
      <form action="#" method="POST" enctype="multipart/form-data" autocomplete="off">
        <div class="error-text"></div>
        <div class="field input">
          <label>Usuario</label>
          <input type="text" name="user" placeholder="Usuario" required>
        </div>
        <div class="field input">
          <label>Contraseña</label>
          <input type="password" name="contraseña" placeholder="Contraseña" required>
          <i class="fas fa-eye"></i>
        </div>
        <div class="field button">
          <input type="submit" name="submit" value="Continue to Chat">
        </div>
      </form>
      <div class="link">No tienes cuenta?<a href="index.php">Registrate</a></div>
    </section>
  </div>
  
  <script src="js/pass-show-hide.js"></script>
  <script src="js/login.js"></script>

</body>
</html>