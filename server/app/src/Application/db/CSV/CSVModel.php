<?php

declare(strict_types=1);

namespace App\Application\db\CSV;

use App\Application\db\DatabaseConnection;
use PDO;

class CSVModel
{
    
public function insertarProfesores(array $profesores){

    $sql = "INSERT INTO profesor (email, password, nombre, fecha_inicio) VALUES (?, ?, ?, ?);"; // Ver que valores se insertaran y editarlo
    $dbInstance = DatabaseConnection::getInstance();

    try{
        $stmt = $dbInstance->execQuery($sql, $profesores);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $res;

    }catch(\Exception $e){
        return 500;
    }finally{
        unset($stmt);
    }

}

public function insertarModulos(array $modulos){

    $sql = "INSERT INTO modulo (nombre, descripcion) VALUES (?, ?);"; // Ver que valores se insertaran y editarlo
    $dbInstance = DatabaseConnection::getInstance();

    try{
        $stmt = $dbInstance->execQuery($sql, $modulos);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $res;

    }catch(\Exception $e){
        return 500;
    }finally{
        unset($stmt);
    }

}
}
