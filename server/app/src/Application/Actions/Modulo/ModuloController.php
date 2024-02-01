<?php

declare(strict_types=1);

namespace App\Application\Actions\Modulo;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\db\Modulos\ModulosModel;

class ModuloController
{
    public function listarModulo(Request $request, Response $response, array $args): Response
    {
        $id = (isset($args["id"])) ? $args["id"] : "";
        $res = ModulosModel::listarModulos($id);
        return $this->returnResponse($response, $res);
    }

    public function inserirModulo(Request $request, Response $response): Response
    {
        // Recoge los datos del body de la peticion que tiene que ser un formato json
        $body = $request->getParsedBody();
        $res = ModulosModel::inserirModulo($body);

        if (!$res) {
            return $this->returnResponse($response, ["error" => "Formato de Modulo incorrecto"], 400);
        }

        return $this->returnResponse($response, $res, 201);
    }

    public function atualizarModulo(Request $request, Response $response, array $args): Response
    {
        $id = $args["id"];
        $body = $request->getParsedBody();
        $res = ModulosModel::atualizarModulo($id, $body);

        return $this->returnResponse($response, $res);
    }

    public function deletarModulo(Request $request, Response $response, array $args): Response
    {
        $id = $args["id"];
        $res = ModulosModel::deletarModulo($id);

        return $this->returnResponse($response, $res);
    }

    private function returnResponse(Response $response, array $res, int $statusCode = 200): Response
    {
        $responseStatus = $response->withStatus($statusCode);
        $responseStatus->withHeader('Content-Type', 'application/json');
        $responseStatus->getBody()->write(json_encode($res));
        return $responseStatus;
    }
}
