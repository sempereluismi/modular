<?php
class DatabaseConnection
{
    private static $instance; // Instancia única de la clase
    private $connection;

    private function __construct($user)
    {
        $config = parse_ini_file("./config.ini", true)["bbdd"];
        $userConfig = parse_ini_file("./config.ini", true)[$user];
        $host = $config["HOST"];
        $dbname = $config["BBDD"];
        $username = $userConfig["USERNAME"];
        $password = $userConfig["PASSWORD"];

        try {
            $this->connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            // Configuración adicional si es necesario
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $e) {
            throw new Exception("Error al conectar a la base de datos: " . $e->getMessage());
        }
    }

    // Método para obtener la instancia única de la clase
    public static function getInstance($user)
    {
        if (!isset(self::$instance)) {
            self::$instance = new self($user);
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
}
