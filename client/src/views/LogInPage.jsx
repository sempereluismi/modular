export function LogInPage() {
    return ( 
        <div className="container-login">
          <h2>Iniciar sesión</h2>
          <form action="procesar_login.php" method="post">
            <div className="userTextBox">
              <label htmlFor="usuario">Usuario:</label>
              <input type="text" id="usuario" name="usuario" required></input>
            </div>
            <div className="passwordTextBoX">
              <label htmlFor="contrasena">Contraseña:</label>
              <input type="password" id="contrasena" name="contrasena" required></input>
            </div>
            <div className="submitButton">
              <input type="submit" value="Enviar"></input>
            </div> 
          </form>
        </div>
    );
  }