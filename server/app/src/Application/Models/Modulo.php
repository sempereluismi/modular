<?php

declare(strict_types=1);

namespace App\Application\Models;

use App\Application\Models\ModelInterface;

/**
 * Clase que representa un módulo.
 */
class Modulo implements ModelInterface
{
    private int $id;
    private string $nombre;
    private string $color;
    private string $especialidad;
    private string $regimen;
    private int $horas_semanales;
    private string $nombre_ciclo;

    /**
     * Constructor de la clase Modulo.
     *
     * @param int $id El ID del módulo.
     * @param string $nombre El nombre del módulo.
     * @param string $color El color del módulo.
     * @param string $especialidad La especialidad del módulo.
     * @param int $horas_semanales Las horas semanales del módulo.
     * @param string $regimen El régimen del módulo.
     * @param string $nombre_ciclo El nombre del ciclo del módulo.
     */
    public function __construct(int $id, string $nombre, string $color, string $especialidad, int $horas_semanales, string $regimen, string $nombre_ciclo)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->color = $color;
        $this->especialidad = $especialidad;
        $this->horas_semanales = $horas_semanales;
        $this->regimen = $regimen;
        $this->nombre_ciclo = $nombre_ciclo;
    }

    /**
     * Método para obtener los datos del módulo.
     *
     * @return array Los datos del módulo.
     */
    public function getData() : array
    {
        return [
            "id" => $this->id,
            "nombre" => $this->nombre,
            "color" => $this->color,
            "especialidad" => $this->especialidad,
            "horas_semanales" => $this->horas_semanales,
            "regimen" => $this->regimen,
            "nombre_ciclo" => $this->nombre_ciclo
        ];
    }
}
