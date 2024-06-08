<?php

declare(strict_types=1);

namespace App\Application\db\Regimen;


use App\Application\db\DatabaseConnection;

class RegimenModel
{

  /**
 * Lista los regímenes de un departamento específico.
 *
 * @param string $id El ID del departamento.
 * @return array Arreglo con la información de los regímenes,
 *               o un arreglo con un mensaje de error si ocurre una excepción.
 */

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

  /**
 * Inserta o actualiza regímenes para un profesor.
 *
 * @param array $data Arreglo con los datos de los regímenes a insertar. Cada elemento del arreglo debe contener:
 *                    'id_regimenes' => ID del régimen,
 *                    'id_profesor' => ID del profesor.
 * @return array Arreglo con un mensaje de éxito o un mensaje de error si ocurre una excepción.
 */

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
