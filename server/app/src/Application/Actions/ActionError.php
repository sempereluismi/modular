<?php

declare(strict_types=1);

namespace App\Application\Actions;

use JsonSerializable;

/**
 * Clase ActionError
 *
 * Representa un error en la aplicación.
 */
class ActionError implements JsonSerializable
{
    /**
     * Tipos predefinidos de errores.
     * 
     */
    public const BAD_REQUEST = 'BAD_REQUEST';
    public const INSUFFICIENT_PRIVILEGES = 'INSUFFICIENT_PRIVILEGES';
    public const NOT_ALLOWED = 'NOT_ALLOWED';
    public const NOT_IMPLEMENTED = 'NOT_IMPLEMENTED';
    public const RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND';
    public const SERVER_ERROR = 'SERVER_ERROR';
    public const UNAUTHENTICATED = 'UNAUTHENTICATED';
    public const VALIDATION_ERROR = 'VALIDATION_ERROR';
    public const VERIFICATION_ERROR = 'VERIFICATION_ERROR';

    private string $type;

    private ?string $description;

    /**
     * Constructor de la clase ActionError.
     *
     * @param $type El tipo de error.
     * @param $description La descripción del error (opcional).
     * 
     */
    public function __construct(string $type, ?string $description = null)
    {
        $this->type = $type;
        $this->description = $description;
    }

    /**
     * Obtiene el tipo de error.
     *
     * @return string El tipo de error.
     * 
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * Establece el tipo de error.
     *
     * @param $type El tipo de error.
     * @return self
     * 
     */
    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    /**
     * Obtiene la descripción del error.
     *
     * @return string|null La descripción del error, o null si no hay descripción.
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * Establece la descripción del error.
     *
     * @param $description La descripción del error (opcional).
     * @return self
     */
    public function setDescription(?string $description = null): self
    {
        $this->description = $description;
        return $this;
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
        return [
            'type' => $this->type,
            'description' => $this->description,
        ];
    }
}
