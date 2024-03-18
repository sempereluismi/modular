<?php

declare(strict_types=1);

namespace App\Application\db\Modulos;

use App\Application\Models\Modulo;
use App\Application\db\DatabaseConnection;

class ModulosModel
{

    private static array $moduloModel = [
        "id",
        "nombre",
        "id_tematica",
        "id_especialidad"
    ];

    public static function listarModulos(string $id = ""): array | int
    {
        $sql = "SELECT 
        rcm.id as id_modulo, m.nombre as nombre_modulo, t.color as color_tematica, es.tipo as tipo_especialidad, rcm.horas_semanales as horas_semanales, c.nombre as nombre_ciclo, re.tipo as tipo_regimen FROM modulo AS m JOIN tematica AS t JOIN especialidad AS es JOIN regimen_ciclo_modulo AS rcm JOIN ciclo AS c JOIN regimen AS re ON (m.id_tematica = t.id AND m.id_especialidad = es.id AND (m.id = rcm.id_modulo) AND c.id = rcm.id_ciclo AND re.id = rcm.id_regimen)";
        $dbInstance = DatabaseConnection::getInstance();
        if ($id === "") {
            try {
                $stmt = $dbInstance->execQuery($sql);
                $result = self::addModulos($stmt);
                if ($result !== null) return $result;
                return 404;
            } catch (\Exception $e) {
                return ["error" => $e->getMessage()];
            }
        }

        $sql .= " WHERE m.id_departamento = ?";

        try {
            $stmt = $dbInstance->execQuery($sql, [$id]);
            $result = self::addModulos($stmt);
            if ($result !== null) return $result;
            return 404;
        } catch (\Exception $e) {
            return ["error" => $e->getMessage()];
        }
    }

    private static function addModulos($stmt)
    {
        $count = 0;
        $result = null;
        while ($row = $stmt->fetch()) {
            $result[$count] = new Modulo(
                $row["id_modulo"],
                $row["nombre_modulo"],
                $row["color_tematica"],
                $row["tipo_especialidad"],
                $row["horas_semanales"],
                $row["tipo_regimen"],
                $row["nombre_ciclo"]
            );
            $result[$count] = $result[$count]->getData();
            $count++;
        }

        return $result;
    }
}
