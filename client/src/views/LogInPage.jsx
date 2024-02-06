export function LogInPage() {
    return (
        <div className="container-login">
          <form action="procesar_login.php" method="post">
            <h2>Iniciar sesión</h2>
            <div className="userTextBox">
              <label for="usuario">Usuario:</label>
              <input type="text" id="usuario" name="usuario" required/>
            </div>
            <div className="passwordTextBoX">
              <label for="contrasena">Contraseña:</label>
              <input type="password" id="contrasena" name="contrasena" required/>
            </div>
            <div className="submitButton">
              <input type="submit" value="Enviar"/> 
            </div>
          </form>
        </div>
    );
  }
  