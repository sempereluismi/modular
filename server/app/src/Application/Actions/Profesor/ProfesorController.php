<?php

declare(strict_types=1);

namespace App\Application\Actions\Profesor;

use App\Application\Actions\Controller;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\db\Profesor\ProfesorModel;

/**
 * Clase ProfesorController
 *
 * Esta clase maneja las operaciones relacionadas con los profesores.
 */
class ProfesorController extends Controller
{

    /**
     * Lista los profesores según el ID de departamento.
     *
     * Este método recibe un ID de departamento y retorna una lista de profesores asociados a ese departamento.
     * Si no se proporciona un ID, se listan todos los profesores.
     *
     * @param $request La solicitud HTTP.
     * @param $response La respuesta HTTP que se enviará.
     * @param $args Argumentos adicionales que contienen el 'id' del departamento.
     * @return $response devuelve la lista de profesores.
     *
     */
    public function listarProfesor(Request $request, Response $response, array $args): Response
    {
        $id = (isset($args["id"])) ? $args["id"] : "";
        $res = ProfesorModel::listarProfesor($id);
        return $this->returnResponse($response, $res);
    }
}
