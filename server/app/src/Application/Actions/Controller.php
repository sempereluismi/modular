<?php

declare(strict_types=1);

namespace App\Application\Actions;

use Psr\Http\Message\ResponseInterface as Response;

class Controller
{
    public function returnResponse(Response $response, array $res, int $statusCode = 200): Response
    {
        $responseStatus = $response->withStatus($statusCode);
        $responseStatus->withHeader('Content-Type', 'application/json');
        $responseStatus->getBody()->write(json_encode($res));
        return $responseStatus;
    }
}
