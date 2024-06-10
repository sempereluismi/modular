<?php

declare(strict_types=1);

namespace App\Application\Actions\Login;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\Actions\Controller;
use App\Application\db\Login\LoginModel;

/**
 * Clase LoginController
 *
 * Esta clase maneja las operaciones relacionadas con el inicio de sesión y la obtención de roles de usuario.
 */
class LoginController extends Controller
{

    /**
     * Maneja el proceso de inicio de sesión.
     *
     * Este método recibe las credenciales de inicio de sesión, las valida y retorna el resultado del intento de inicio de sesión.
     *
     * @param $request contiene los datos de inicio de sesión.
     * @param $response La respuesta HTTP que se enviará.
     * @param $args Argumentos adicionales.
     * @return $response devuelve si algo salió mal o si se ha logeado bien.
     *
     */
    public function login(Request $request, Response $response, array $args): Response
    {
        $data = $request->getParsedBody();
        $email = $data["email"];
        $password = $data["password"];

        $res = LoginModel::login($email, $password);

        if (gettype($res) === "array") {
            return $this->returnResponse($response, $res);
        }

        if ($res === 200) {
            return $this->returnResponse($response, ["userInfo" => "login completo"]);
        }

        return $this->returnResponse($response, ["error" => "algo fue mal => " . $res], $res);
    }

    /**
     * Obtiene el rol de un usuario basado en su ID.
     *
     * Este método recibe un ID de usuario y retorna el rol asociado con ese ID.
     *
     * @param $request La solicitud HTTP.
     * @param $response La respuesta HTTP que se enviará.
     * @param $args Argumentos adicionales que contienen el 'id' del usuario.
     * @return $response devuelve el rol que tiene el usuario o si algo salió mal.
     * 
     */
    public function rol(Request $request, Response $response, array $args)
    {
        $id = (isset($args["id"])) ? $args["id"] : null;
        if ($id === null) return $this->returnResponse($response, ["error" => "Method Not Allowed"], 405);

        $res = LoginModel::rol($id);
        if (gettype($res) === "array") {
            return $this->returnResponse($response, $res);
        }


        if ($res === 500) {
            return $this->returnResponse($response, ["error" => "something wrong"], $res);
        }

        if ($res === 404) return $this->returnResponse($response, ["rol" => "0"], 200);

        return $this->returnResponse($response, ["rol" => 1]);
    }
}
