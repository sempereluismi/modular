<?php

declare(strict_types=1);

namespace App\Application\db\Login;

use App\Application\db\DatabaseConnection;
use PDO;

class LoginModel
{
    public static function login($user, $password): array | int
    {
        $sql = "SELECT password FROM Modular.profesor where email = ?;";
        $dbInstance = DatabaseConnection::getInstance();

        try {
            $stmt = $dbInstance->execQuery($sql, [$user]);
            $res = $stmt->fetch();
            if (sizeof($res) > 0) {
                if (password_verify($password, $res["password"])) {
                    $sql = "SELECT id, nombre FROM Modular.profesor where email = ?;";
                    $stmt = $dbInstance->execQuery($sql, [$user]);
                    $res = $stmt->fetch(PDO::FETCH_ASSOC);
                    return $res;
                }
            }
            return 404;
        } catch (\Exception $e) {
            return 500;
        }
    }
}
