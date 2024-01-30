<?php

declare(strict_types=1);


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use App\Application\Actions\Modulo\ModuloController;


return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->group('/api', function (Group $group) {
        $group->group('/modulos', function(Group $group) {
            $group->get('', [ModuloController::class, 'listarModulos']);
            $group->get('/{id}', [ModuloController::class, 'listarModulo']);
            // TODO ARREGLAR METODO POST QUE DA 405
            $group->post('', [ModuloController::class, 'inserirModulo']);
            $group->put('/{id}', [ModuloController::class, 'atualizarModulo']);
            $group->delete('/{id}', [ModuloController::class, 'deletarModulo']);
        });
    });
};

