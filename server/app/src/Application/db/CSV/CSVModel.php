<?php

declare(strict_types=1);

namespace App\Application\db\CSV;

use App\Application\db\DatabaseConnection;
use PDO;

class CSVModel
{

    public static function insertarProfesores(array $profesores)
    {
        $sqlEspecialidadId = "SELECT id from especialidad where tipo = ?;";
        $dbInstance = DatabaseConnection::getInstance();
        $dbConexion = $dbInstance->getConnection();

        $idAfin = [];

        foreach ($profesores['afin'] as $profesor) {
            $stmt = $dbInstance->execQuery($sqlEspecialidadId, [$profesor]);
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            $idAfin[] = $res['id'];
        }

        $index = null;
        foreach ($profesores['afin'] as $key => $afinidad) {
            if ($afinidad === $profesores['especialidad']) {
                $index = $key;
                break;
            }
        }

        $idEspecialidad = $idAfin[$index]; // ID de la especialidad

        $nuevoProfesor = [
            $profesores['email'],
            $profesores['password'],
            $profesores['nombre'],
            $profesores['fecha_inicio'],
            $profesores['departamento'],
            $idEspecialidad
        ];


        $sql = "INSERT INTO profesor (email, password, nombre, fecha_inicio, id_departamento, id_especialidad) VALUES (?, ?, ?, ?, ?, ?)"; // Ver que valores se insertaran y editarlo

        try {
            $stmt = $dbInstance->execQuery($sql, $nuevoProfesor);
            $ultimoId = $dbConexion->lastInsertId();

            $slqAfin = "INSERT INTO afin (id_profesor, id_especialidad) VALUES (?, ?);";

            foreach ($idAfin as $id) {
                $stmt = $dbInstance->execQuery($slqAfin, [$ultimoId, $id]);
            }
            return $ultimoId;
        } catch (\Exception $e) {
            return 500;
        }
    }


    public static function insertarModulos(array $modulos)
    {

        $sqlEspecialidadId = "SELECT id from especialidad where tipo = ?;";
        $dbInstance = DatabaseConnection::getInstance();

        $idEspecialidad = [];

        $stmt = $dbInstance->execQuery($sqlEspecialidadId, [$modulos['especialidad']]);
        $idEspecialidadId = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($idEspecialidad === false) {
            return 404;
        }

        $idEspecialidad = $idEspecialidadId['id'];

        $nuevoModulo = [
            $modulos['nombre'],
            $modulos['departamento'],
            $modulos['tematica'],
            $idEspecialidad
        ];

        var_dump($nuevoModulo);

        $sql = "INSERT INTO modulo (nombre, id_departamento, id_tematica, id_especialidad) VALUES (?, ?, ?, ?);";

        try {
            $stmt = $dbInstance->execQuery($sql, $nuevoModulo);
            return $stmt;
        } catch (\Exception $e) {
            return 500;
        }
    }
}
