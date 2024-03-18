<?php

declare(strict_types=1);

namespace App\Application\db;

class DatabaseConnection
{
    private static $instance; // Instancia única de la clase
    private $connection;

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

    // Método para obtener la instancia única de la clase
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    // Método para obtener la conexión PDO
    public function getConnection()
    {
        return $this->connection;
    }

    // Evitar que se cree otra instancia mediante clonación
    private function __clone()
    {
    }

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
