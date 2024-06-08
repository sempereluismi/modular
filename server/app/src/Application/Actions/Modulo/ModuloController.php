<?php

declare(strict_types=1);

namespace App\Application\Actions\Modulo;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\db\Modulos\ModulosModel;
use App\Application\Actions\Controller;

class ModuloController extends Controller
{

    /**
     * Lista los módulos según el ID de departamento.
     *
     * Este método recibe un ID de departamento y retorna una lista de módulos asociados a ese departamento.
     * Si no se proporciona un ID, se listan todos los módulos.
     *
     * @param $request La solicitud HTTP.
     * @param $response La respuesta HTTP que se enviará.
     * @param $args Argumentos adicionales que contienen el 'id' del departamento.
     * @return $response devuelve la lista de módulos
     *
     */
    public function listarModulo(Request $request, Response $response, array $args): Response
    {
        $id = (isset($args["id"])) ? $args["id"] : "";
        $res = ModulosModel::listarModulos($id);
        return $this->returnResponse($response, $res);
    }
}
