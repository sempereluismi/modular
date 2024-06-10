<?php

declare(strict_types=1);

namespace App\Application\db\CSV;

use App\Application\db\DatabaseConnection;
use PDO;

class CSVModel
{

/**
 * Inserta un nuevo profesor en la base de datos.
 *
 * @param array $profesores Arreglo con los datos del profesor a insertar.
 *                          Debe contener las claves: 'email', 'password', 'nombre', 
 *                          'fecha_inicio', 'departamento', 'especialidad' y 'afin'.
 *                          'afin' es un arreglo de especialidades en las que el profesor tiene afinidad.
 * @return int El ID del nuevo profesor insertado.
 * @throws Exception Si ocurre un error en la inserción o si la especialidad no se encuentra.
 */

    public static function insertarProfesores(array $profesores)
    {
        $sqlEspecialidadId = "SELECT id from especialidad where tipo like ?;";
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
            throw new Exception("Internal server error", 500);
        }
    }

/**
 * Inserta un nuevo módulo en la base de datos.
 *
 * @param $modulos Arreglo con los datos del módulo a insertar.
 *                       Debe contener las claves: 'nombre', 'departamento', 'tematica', 
 *                       'especialidad', 'regimen', 'ciclo' y 'horas'.
 * @throws Exception Si ocurre un error en la inserción o si la especialidad, régimen o ciclo no se encuentran.
 */

    public static function insertarModulos(array $modulos)
    {

        $sqlEspecialidadId = "SELECT id from especialidad where tipo like ?;";
        $dbInstance = DatabaseConnection::getInstance();

        $idEspecialidad = [];

        $stmt = $dbInstance->execQuery($sqlEspecialidadId, [$modulos['especialidad']]);
        $idEspecialidadId = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($idEspecialidad === false) {
            throw new Exception("Especialidad no encontrada", 404);
        }

        $idEspecialidad = $idEspecialidadId['id'];

        $nuevoModulo = [
            $modulos['nombre'],
            $modulos['departamento'],
            $modulos['tematica'],
            $idEspecialidad
        ];


        $insertModulo = "INSERT INTO modulo (nombre, id_departamento, id_tematica, id_especialidad) VALUES (?, ?, ?, ?);";
        $insertRegimenCicloModulo = "INSERT INTO regimen_ciclo_modulo (id_regimen, id_ciclo, id_modulo, horas_semanales) VALUES (?, ?, ?, ?);";
        try {
            $stmt = $dbInstance->execQuery($insertModulo, $nuevoModulo);
            $moduloID = $dbInstance->getConnection()->lastInsertId();
            $regimen = $dbInstance->execQuery("SELECT id from regimen where tipo like ?;", [$modulos['regimen']]);
            $ciclo = $dbInstance->execQuery("SELECT id from ciclo where nombre like ?;", [$modulos['ciclo']]);
            $ciclo = $ciclo->fetch(PDO::FETCH_ASSOC)['id'];
            $regimen = $regimen->fetch(PDO::FETCH_ASSOC)['id'];
            
            if($ciclo === false || $regimen === false) throw new Exception("Ciclo o regimen no encontrados", 404);

            $regimenModulo = [
                $regimen,
                $ciclo,
                $moduloID,
                $modulos['horas']
            ];

            $stmt = $dbInstance->execQuery($insertRegimenCicloModulo, $regimenModulo);
        } catch (\Exception $e) {
            throw new Exception("Internal server error", 500);
        }
    }

    /**
 * Guarda un archivo en la base de datos asociado a un profesor.
 *
 * @param $contentFile El contenido del archivo a guardar.
 * @param $id_profesor El ID del profesor al que se asocia el archivo.
 * @throws Exception Si ocurre un error al guardar el archivo.
 */

    public static function saveFiles($contentFile, $id_profesor) {
        try {
            $sql = "INSERT INTO modelo (file, id_profesor) VALUES (?, ?)";
            $dbInstance = DatabaseConnection::getInstance();
            $stmt = $dbInstance->execQuery($sql, [$contentFile, $id_profesor]);
    
        } catch (PDOException $e) {
            // Manejar errores
            error_log("Error al guardar el archivo en la base de datos: " . $e->getMessage());
        }
    } 
}
