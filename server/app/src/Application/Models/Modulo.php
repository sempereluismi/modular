<?php

declare(strict_types=1);

class Modulo
{
    private int $id;
    private string $descripcion;
    private string $especializacion;
    private array $tematicas;

    public function __construct(int $id, string $descripcion, string $especializacion, array $tematicas)
    {
        $this->$id = $id;
        $this->$descripcion = $descripcion;
        $this->$especializacion = $especializacion;
        $this->$tematicas = $tematicas;
    }
}
