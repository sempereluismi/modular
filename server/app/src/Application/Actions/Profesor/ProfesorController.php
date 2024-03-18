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
}
