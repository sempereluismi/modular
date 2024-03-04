<?php

declare(strict_types=1);

namespace App\Application\db\Login;

use App\Application\db\DatabaseConnection;

class LoginModel
{
    public static function login($user, $password): array | int
    {
        $sql = "SELECT email, password FROM Modular.profesor where email = ?;";
        $dbInstance = DatabaseConnection::getInstance();

        try {
            $stmt = $dbInstance->execQuery($sql, [$user]);
            $res = $stmt->fetch();
            if (sizeof($res) > 0) {
                if (password_verify($password, $res["password"])) {
                    return 200;
                    
                }
            }
            return 404;
        } catch (\Exception $e) {
            return 500;
        }
    }
}
