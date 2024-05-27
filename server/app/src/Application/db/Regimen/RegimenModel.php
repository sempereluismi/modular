<?php

declare(strict_types=1);

namespace App\Application\db\Regimen;


use App\Application\db\DatabaseConnection;

class RegimenModel
{
  public static function listarRegimen(string $id)
  {
    $db = DatabaseConnection::getInstance();
    $sql = "SELECT id, tipo FROM regimen where id_departamento = ?;";
    try {
      $stmt = $db->execQuery($sql, [$id]);
      $res = $stmt->fetchAll(\PDO::FETCH_ASSOC);
      return $res;
    } catch (\Exception $e) {
      return ["error" => $e->getMessage()];
    }
  }

  public static function inserirRegimen(array $data)
  {
    $db = DatabaseConnection::getInstance();
    $sql = "INSERT INTO profesor_regimen (id_regimen, id_profesor) VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE id_regimen = VALUES(id_regimen);";
    try {
      foreach ($data as $regimen) {
        $stmt = $db->execQuery($sql, [$regimen['id_regimenes'], $regimen['id_profesor']]);
      }
      return ["message" => "Regimen inserido com sucesso"];
    } catch (\Exception $e) {
      return ["error" => $e->getMessage()];
    }
  }
}
