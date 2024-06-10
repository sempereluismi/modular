<?php

declare(strict_types=1);

namespace App\Application\Actions;

use Psr\Http\Message\ResponseInterface as Response;

/**
 * Clase Controller
 *
 * Esta clase proporciona métodos comunes que pueden ser utilizados por controladores específicos.
 */
class Controller
{
    /**
     * Retorna una respuesta HTTP con el contenido y el código de estado especificados.
     *
     * Este método configura la respuesta HTTP con el código de estado dado, 
     * establece el tipo de contenido a JSON y escribe el cuerpo de la respuesta con los datos proporcionados.
     *
     * @param $response La respuesta HTTP que se configurará.
     * @param $res Los datos que se incluirán en el cuerpo de la respuesta.
     * @param $statusCode El código de estado HTTP (por defecto es 200).
     * @return $responseStatus devuelve el status configurado.
     * 
     */

    public function returnResponse(Response $response, array $res, int $statusCode = 200): Response
    {
        $responseStatus = $response->withStatus($statusCode);
        $responseStatus->withHeader('Content-Type', 'application/json');
        $responseStatus->getBody()->write(json_encode($res));
        return $responseStatus;
    }
}
