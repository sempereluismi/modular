<?php

declare(strict_types=1);

namespace App\Application\Actions\Login;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\Actions\Controller;
use App\Application\db\Login\LoginModel;

class LoginController extends Controller
{
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

        return $this->returnResponse($response, ["error" => "algo fue mal => " . $res]);
    }
}
