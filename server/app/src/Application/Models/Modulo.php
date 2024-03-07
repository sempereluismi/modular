<?php

declare(strict_types=1);

namespace App\Application\Models;

class Modulo
{
    private int $id;
    private string $nombre;
    private string $color;
    private string $especialidad;
    private string $regimen;
    private int $horas_semanales;
    private string $nombre_ciclo;

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

    public function getData()
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
