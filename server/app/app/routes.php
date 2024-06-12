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


/**
 * Esta es la sección de enrutamiento
 * 
 * Ruta '/{routes:.*}':
 * Maneja solicitudes OPTIONS para todas las rutas (CORS Pre-Flight).
 * 
 * Grupo de rutas base '/api':
 * 
 *   Grupo de rutas '/modulos':
 *     - GET '': Lista todos los módulos (Metodo: listarModulo en ModuloController).
 *     - GET '/{id}': Lista un módulo específico por ID (Metodo: listarModulo en ModuloController).
 * 
 *   Grupo de rutas '/profesor':
 *     - GET '': Lista todos los profesores (Metodo: listarProfesor en ProfesorController).
 *     - GET '/{id}': Lista un profesor específico por ID (Metodo: listarProfesor en ProfesorController).
 * 
 *   Grupo de rutas '/csv':
 *     - POST '/upload/{id}': Sube archivos CSV por ID (Metodo: uploadFiles en ComprobacionCSV).
 *     - POST '/save-model/{id}': Guarda modelos de archivos CSV por ID (Metodo: saveFiles en ComprobacionCSV).
 *     - GET '/list/{id}': Lista archivos CSV por ID (Metodo: listFiles en ComprobacionCSV).
 * 
 *   Grupo de rutas '/auth':
 *     - POST '/login': Iniciar sesión (Metodo: login en LoginController).
 *     - GET '/rol/{id}': Obtener rol por ID (Metodo: rol en LoginController).
 * 
 *   Grupo de rutas '/regimen':
 *     - GET '/{id}': Listar régimen por ID (Metodo: listarRegimen en RegimenController).
 *     - POST '': Insertar un nuevo régimen (Metodo: inserirRegimen en RegimenController).
 */

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
            $group->get('/list-profesor/{id}', [ComprobacionCSV::class, 'listFilesProfesor']);
            $group->get('/list-admin/{id}', [ComprobacionCSV::class, 'listFileAdmin']);
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
