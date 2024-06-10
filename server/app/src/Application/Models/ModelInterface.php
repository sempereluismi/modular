<?php

declare(strict_types=1);

namespace App\Application\Models;

/**
 * Interfaz que define el método para obtener los datos de un modelo.
 */
interface ModelInterface
{
    /**
     * Método para obtener los datos de un modelo.
     *
     * @return array Los datos del modelo.
     */
    public function getData(): array;
}
