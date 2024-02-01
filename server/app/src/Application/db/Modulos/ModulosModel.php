<?php

declare(strict_types=1);

namespace App\Application\db\Modulos;

class ModulosModel
{

    private static $moduloModel = ["id", "nombre", "h_semanales"];

    public static function listarModulos(string $id = ""): array
    {
        if ($id === "") {
            return ["Listar Todos los Modulos"];
        }
        return ["Modulo" => $id];
    }

    public static function inserirModulo(array $body): array | false
    {
        if (!self::validarModulo($body)) {
            return false;
        }

        return ["Modulo" => $body];
    }

    private static function validarModulo(array $body): bool
    {
        return array_keys($body) === self::$moduloModel;
    }

    public static function atualizarModulo(string $id, array $body): array | bool
    {
        return ["Modulo" => $id, "body" => $body, "res" => "Atualizar Modulo"];
    }

    public static function deletarModulo(string $id): array | bool
    {
        return ["Modulo" => $id, "res" => "Deletar Modulo"];
    }
}
