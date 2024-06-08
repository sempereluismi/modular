<?php

declare(strict_types=1);

namespace App\Application\Actions;

use App\Domain\DomainException\DomainRecordNotFoundException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpNotFoundException;

abstract class Action
{
    protected LoggerInterface $logger;

    protected Request $request;

    protected Response $response;

    protected array $args;


    /**
     * Constructor de la clase Action.
     *
     * @param LoggerInterface $logger El logger para registrar información y errores.
     */

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * Invoca la acción y maneja las excepciones comunes.
     *
     * @param $request La solicitud HTTP.
     * @param $response La respuesta HTTP.
     * @param $args Argumentos adicionales.
     * @return Response devuelve la acción.
     * @throws HttpNotFoundException Si no se encuentra el registro de dominio.
     * @throws HttpBadRequestException Si hay un error en la solicitud.
     * 
     */
    public function __invoke(Request $request, Response $response, array $args): Response
    {
        $this->request = $request;
        $this->response = $response;
        $this->args = $args;

        try {
            return $this->action();
        } catch (DomainRecordNotFoundException $e) {
            throw new HttpNotFoundException($this->request, $e->getMessage());
        }
    }

    /**
     * Ejecuta la acción.
     *
     * Este método debe ser implementado por las subclases para definir la lógica específica de la acción.
     *
     * @return Response La respuesta HTTP resultante de la acción.
     * @throws DomainRecordNotFoundException Si no se encuentra el registro de dominio.
     * @throws HttpBadRequestException Si hay un error en la solicitud.
     * 
     */
    abstract protected function action(): Response;

    /**
     * Obtiene los datos del formulario de la solicitud.
     *
     * @return array|object Los datos del formulario.
     */
    protected function getFormData()
    {
        return $this->request->getParsedBody();
    }

    /**
     * Resuelve un argumento de la solicitud.
     *
     * @param $name El nombre del argumento.
     * @return mixed El valor del argumento.
     * @throws HttpBadRequestException Si no se puede resolver el argumento.
     */
    protected function resolveArg(string $name)
    {
        if (!isset($this->args[$name])) {
            throw new HttpBadRequestException($this->request, "Could not resolve argument `{$name}`.");
        }

        return $this->args[$name];
    }

    /**
     * Responde con los datos proporcionados y un código de estado.
     *
     * @param $data Los datos para incluir en la respuesta.
     * @param $statusCode El código de estado HTTP (por defecto es 200).
     * @return Response La respuesta HTTP.
     * 
     */
    protected function respondWithData($data = null, int $statusCode = 200): Response
    {
        $payload = new ActionPayload($statusCode, $data);

        return $this->respond($payload);
    }

    /**
     * Responde con el payload proporcionado.
     *
     * @param $payload El payload para incluir en la respuesta.
     * @return Response La respuesta HTTP.
     * 
     */
    protected function respond(ActionPayload $payload): Response
    {
        $json = json_encode($payload, JSON_PRETTY_PRINT);
        $this->response->getBody()->write($json);

        return $this->response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus($payload->getStatusCode());
    }
}
