<?php

declare(strict_types=1);

namespace App\Application\Models;

use App\Application\Models\ModelInterface;

class Profesor implements ModelInterface
{
    private int $id;
    private string $nombre;
    private string $especializacion;
    private string $regimen;
    private array $afin;

    public function __construct(int $id, string $nombre, string $especializacion, array $afin, string $regimen = "")
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->especializacion = $especializacion;
        $this->regimen = $regimen;
        $this->afin = $afin;
    }

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
