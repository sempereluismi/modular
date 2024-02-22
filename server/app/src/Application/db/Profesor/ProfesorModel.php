<?php

declare(strict_types=1);

namespace App\Application\db\Profesor;

class ProfesorModel
{

    private static $profesorModel = ["id", "nombre", "fecha_inicio", "instituto", "id_especializacion", "id_instituto"];

    public static function listarProfesor(string $id = ""): array
    {
        if ($id === "") {
            return ["Listar Todos los Profesores"];
        }
        return ["Profesor" => $id];
    }

    public static function inserirProfesor(array $body): array | false
    {
        if (!self::validarProfesor($body)) {
            return false;
        }

        return ["Profesor" => $body];
    }

    private static function validarProfesor(array $body): bool
    {
        return array_keys($body) === self::$profesorModel;
    }

    public static function atualizarProfesor(string $id, array $body): array | bool
    {
        return ["Profesor" => $id, "body" => $body, "res" => "Atualizar Modulo"];
    }

    public static function deletarProfesor(string $id): array | bool
    {
        return ["Profesor" => $id, "res" => "Deletar Profesor"];
    }
}
