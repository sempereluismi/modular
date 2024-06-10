<?php

declare(strict_types=1);

namespace App\Application\Models;

use App\Application\Models\ModelInterface;

/**
 * Clase que representa un profesor.
 */
class Profesor implements ModelInterface
{
    private int $id;
    private string $nombre;
    private string $especializacion;
    private string $regimen;
    private array $afin;

    /**
     * Constructor de la clase Profesor.
     *
     * @param int $id El ID del profesor.
     * @param string $nombre El nombre del profesor.
     * @param string $especializacion La especialización del profesor.
     * @param array $afin Las especialidades en las que el profesor tiene afinidad.
     * @param string $regimen El régimen del profesor (opcional).
     */
    public function __construct(int $id, string $nombre, string $especializacion, array $afin, string $regimen = "")
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->especializacion = $especializacion;
        $this->regimen = $regimen;
        $this->afin = $afin;
    }

    /**
     * Método para obtener los datos del profesor.
     *
     * @return array Los datos del profesor.
     */
    public function getData() : array
    {
        return [
            "id" => $this->id,
            "nombre" => $this->nombre,
            "especializacion" => $this->especializacion,
            "regimen" => $this->regimen,
            "afin" => $this->afin
        ];
    }

}
