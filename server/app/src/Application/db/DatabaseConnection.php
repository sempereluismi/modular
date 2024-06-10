<?php

declare(strict_types=1);

namespace App\Application\db;

/**
 * Clase para la gestión de la conexión a la base de datos.
 */
class DatabaseConnection
{
    private static $instance; // Instancia única de la clase
    private $connection;

    /**
 * Constructor privado para evitar la creación directa de instancias.
 * Lee la configuración de la base de datos desde un archivo INI y establece la conexión PDO.
 *
 * @throws \Exception Si ocurre un error al conectar a la base de datos.
 */

    private function __construct()
    {
        $config = parse_ini_file(__DIR__ . "/../../config/configbd.ini", true)["bbdd"];
        $host = $config["HOST"];
        $dbname = $config["BBDD"];
        $username = $config["USERNAME"];
        $password = $config["PASSWORD"];

        try {
            $this->connection = new \PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            // Configuración adicional si es necesario
            $this->connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
        } catch (\PDOException $e) {
            throw new \Exception("Error al conectar a la base de datos: " . $e->getMessage());
        }
    }

    /**
 * Obtiene la instancia única de la clase (patrón Singleton).
 *
 * @return self La instancia única de la clase.
 */

    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
 * Obtiene la conexión PDO.
 *
 * @return \PDO La conexión PDO.
 */

    public function getConnection()
    {
        return $this->connection;
    }

    /**
 * Método privado para evitar que se cree otra instancia mediante clonación.
 */

    private function __clone()
    {
    }

    /**
 * Ejecuta una consulta preparada con los parámetros proporcionados.
 *
 * @param $query La consulta SQL a ejecutar.
 * @param $params Los parámetros para la consulta SQL.
 * @return \PDOStatement|false El objeto PDOStatement si la ejecución es exitosa, o false si ocurre un error.
 */

    public function execQuery($query, $params = [])
    {
        try {
            $stmt = $this->connection->prepare($query);
            $stmt->execute($params);
            return $stmt;
        } catch (\PDOException $e) {
            return false;
        }
    }
}
