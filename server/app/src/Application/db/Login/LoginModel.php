<?php

declare(strict_types=1);

namespace App\Application\db\Login;

use App\Application\db\DatabaseConnection;
use PDO;

/**
 * Modelo para la gestión de inicio de sesión de usuarios.
 */
class LoginModel
{
    /**
 * Verifica las credenciales de un usuario y devuelve su información.
 *
 * @param $user El correo electrónico del usuario.
 * @param $password La contraseña del usuario.
 * @return La información del usuario si las credenciales son correctas, 
 *                   404 si las credenciales son incorrectas, 
 *                   o 500 si ocurre un error interno.
 */

    public static function login(string $user, string $password): array | int
    {
        $sql = "SELECT password FROM Modular.profesor where email = ?;";
        $dbInstance = DatabaseConnection::getInstance();

        try {
            $stmt = $dbInstance->execQuery($sql, [$user]);
            $res = $stmt->fetch();
            if ($res) {
                if (password_verify($password, $res["password"])) {
                    $sql = "SELECT pf.id, pf.nombre, (select count(id_profesor) from profesor_admin where id_profesor = pf.id ) as jefe, pf.id_departamento FROM Modular.profesor as pf where email = ?;";
                    $stmt = $dbInstance->execQuery($sql, [$user]);
                    $res = $stmt->fetch(PDO::FETCH_ASSOC);
                    return $res;
                }
            }
            return 404;
        } catch (\Exception $e) {
            return 500;
        } finally {
            unset($stmt);
        }
    }

    /**
 * Verifica si un profesor tiene el rol de administrador.
 *
 * @param $id El ID del profesor.
 * @return 200 si el profesor tiene el rol de administrador,
 *             404 si no tiene el rol de administrador,
 *             o 500 si ocurre un error interno.
 */

    public static function rol(string $id): array | int
    {
        $sql = "SELECT count(id_profesor) as num FROM Modular.profesor_admin where id_profesor = ?;";
        $dbInstance = DatabaseConnection::getInstance();

        try {
            $stmt = $dbInstance->execQuery($sql, [$id]);
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($res["num"] === 1) return 200;
            return 404;
        } catch (\Exception $e) {
            return 500;
        } finally {
            unset($stmt);
        }
    }
}
