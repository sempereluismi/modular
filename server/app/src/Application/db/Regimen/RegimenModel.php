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
}
