<?php
declare(strict_types=1);

namespace App\Application\Actions\Modulo;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ModuloController {
    public function listarModulos(Request $request, Response $response, array $args) : Response {
        $response->getBody()->write("Listar Modulos");
        return $response;
    }

    public function listarModulo(Request $request, Response $response, array $args) : Response {
        $id = $args["id"];
        $response->getBody()->write("Listar Modulo: $id");
        return $response;
    }

    public function inserirModulo(Request $request, Response $response, array $args) : Response {
        $response->getBody()->write("Inserir Modulo");
        return $response;
    }

    public function atualizarModulo(Request $request, Response $response, array $args) : Response {
        $response->getBody()->write("Atualizar Modulo");
        return $response;
    }

    public function deletarModulo(Request $request, Response $response, array $args) : Response {
        $response->getBody()->write("Deletar Modulo");
        return $response;
    }
}