<?php

declare(strict_types=1);

namespace App\Application\Actions\Profesor;

use App\Application\Actions\Controller;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\db\Profesor\ProfesorModel;

class ProfesorController extends Controller
{
    public function listarProfesor(Request $request, Response $response, array $args): Response
    {
        $id = (isset($args["id"])) ? $args["id"] : "";
        $res = ProfesorModel::listarProfesor($id);
        return $this->returnResponse($response, $res);
    }

    public function inserirProfesor(Request $request, Response $response): Response
    {
        // Recoge los datos del body de la peticion que tiene que ser un formato json
        $body = $request->getParsedBody();
        $res = ProfesorModel::inserirProfesor($body);

        if (!$res) {
            return $this->returnResponse($response, ["error" => "Formato de Profesor incorrecto"], 400);
        }

        return $this->returnResponse($response, $res, 201);
    }

    public function atualizarProfesor(Request $request, Response $response, array $args): Response
    {
        $id = $args["id"];
        $body = $request->getParsedBody();
        $res = ProfesorModel::atualizarProfesor($id, $body);

        return $this->returnResponse($response, $res);
    }

    public function deletarProfesor(Request $request, Response $response, array $args): Response
    {
        $id = $args["id"];
        $res = ProfesorModel::deletarProfesor($id);

        return $this->returnResponse($response, $res);
    }
}
