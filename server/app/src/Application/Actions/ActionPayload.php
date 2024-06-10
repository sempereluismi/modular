<?php

declare(strict_types=1);

namespace App\Application\Actions;

use JsonSerializable;

/**
 * Clase ActionPayload
 *
 * Representa el payload de una acción en la aplicación, que incluye el código de estado HTTP,
 * los datos y cualquier error asociado con la acción.
 */
class ActionPayload implements JsonSerializable
{
    private int $statusCode;

    /**
     * @var array|object|null
     */
    private $data;

    private ?ActionError $error;

    /**
     * Constructor de la clase ActionPayload.
     *
     * @param $statusCode El código de estado HTTP (por defecto es 200).
     * @param $data Los datos del payload (opcional).
     * @param $error El error del payload (opcional).
     * 
     */
    public function __construct(
        int $statusCode = 200,
        $data = null,
        ?ActionError $error = null
    ) {
        $this->statusCode = $statusCode;
        $this->data = $data;
        $this->error = $error;
    }

    /**
     * Obtiene el código de estado HTTP.
     *
     * @return int El código de estado HTTP.
     * 
     */
    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    /**
     * Obtiene los datos del payload.
     *
     * @return array|object|null Los datos del payload.
     * 
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Obtiene el error del payload.
     *
     * @return ActionError|null El error del payload.
     * 
     */
    public function getError(): ?ActionError
    {
        return $this->error;
    }
    /**
     * Serializa el objeto a un array para su representación JSON.
     *
     * @return array El array serializado del objeto.
     * 
     */
    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        $payload = [
            'statusCode' => $this->statusCode,
        ];

        if ($this->data !== null) {
            $payload['data'] = $this->data;
        } elseif ($this->error !== null) {
            $payload['error'] = $this->error;
        }

        return $payload;
    }
}
