<?php

declare(strict_types=1);

namespace App\Application\Actions\Modulo;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\db\Modulos\ModulosModel;
use App\Application\Actions\Controller;

class ModuloController extends Controller
{
    public function listarModulo(Request $request, Response $response, array $args): Response
    {
        $id = (isset($args["id"])) ? $args["id"] : "";
        $res = ModulosModel::listarModulos($id);
        return $this->returnResponse($response, $res);
    }
}
