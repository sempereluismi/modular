<?php

declare(strict_types=1);


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use App\Application\Actions\Modulo\ModuloController;
use App\Application\Actions\Profesor\ProfesorController;
use App\Application\Actions\Regimen\RegimenController;
use App\Application\Actions\CSV\ComprobacionCSV;
use App\Application\Actions\Login\LoginController;


return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });
    $app->group('/api', function (Group $group) {
        $group->group('/modulos', function (Group $group) {
            $group->get('', [ModuloController::class, 'listarModulo']);
            $group->get('/{id}', [ModuloController::class, 'listarModulo']);
            $group->post('', [ModuloController::class, 'inserirModulo']);
            $group->put('/{id}', [ModuloController::class, 'atualizarModulo']);
            $group->delete('/{id}', [ModuloController::class, 'deletarModulo']);
        });
        $group->group('/profesor', function (Group $group) {
            $group->get('', [ProfesorController::class, 'listarProfesor']);
            $group->get('/{id}', [ProfesorController::class, 'listarProfesor']);
            $group->post('', [ProfesorController::class, 'inserirProfesor']);
            $group->put('/{id}', [ProfesorController::class, 'atualizarProfesor']);
            $group->delete('/{id}', [ProfesorController::class, 'deletarProfesor']);
        });
        $group->group('/upload', function (Group $group) {
            $group->post('/profesor/{id}', [ComprobacionCSV::class, 'uploadFiles']);
            $group->post('/modulos/{id}', [ComprobacionCSV::class, 'uploadFiles']);
        });
        $group->group('/auth', function (Group $group) {
            $group->post('/login', [LoginController::class, 'login']);
            $group->get('/rol/{id}', [LoginController::class, 'rol']);
        });
        $group->group('/regimen', function (Group $group) {
            $group->get('/{id}', [RegimenController::class, 'listarRegimen']);
            $group->post('', [RegimenController::class, 'inserirRegimen']);
        });
    });
};
