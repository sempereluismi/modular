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
        });
        $group->group('/profesor', function (Group $group) {
            $group->get('', [ProfesorController::class, 'listarProfesor']);
            $group->get('/{id}', [ProfesorController::class, 'listarProfesor']);
        });
        
        $group->group('/csv', function (Group $group) {
            $group->post('/upload/{id}', [ComprobacionCSV::class, 'uploadFiles']);
            $group->post('/save-model/{id}', [ComprobacionCSV::class, 'saveFiles']);
            $group->get('/list/{id}', [ComprobacionCSV::class, 'listFiles']);
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
