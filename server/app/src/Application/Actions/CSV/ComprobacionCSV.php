<?php

namespace App\Application\Actions\CSV;

use App\Application\Actions\Controller;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\db\CSV\CSVModel;

class ComprobacionCSV extends Controller
{

    const arrayProfesores = ["email", "password", "nombre", "fecha_inicio", "especialidad", "afin"];
    const arrayModulos = ["nombre", "departamento", "tematica", "especialidad"];

    private function formatDate( $fechaInicio ) {
        $fechaInicioArray = explode('-', $fechaInicio);
            $año = $fechaInicioArray[2];
            $mes = $fechaInicioArray[1];
            $dia = $fechaInicioArray[0];
            return compact('año', 'mes', 'dia');

    }

    private function hashPassword($password)
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public function uploadFiles(Request $request, Response $response, array $args)
    {
        header("Access-Control-Allow-Origin: http://localhost:5173");

        // Obtenemos los archivos subidos
        $uploadedFiles = $request->getUploadedFiles();

        // Verificamos que se haya enviado un archivo y es un CSV
        if (isset($uploadedFiles['csvFile']) && $uploadedFiles['csvFile']->getError() === UPLOAD_ERR_OK) {
            if ($this->esArchivoCSV($uploadedFiles['csvFile'])) { // Comprobar los priemros campos del archivo
                // Procesa el archivo csv

                $uploadedFile = $uploadedFiles['csvFile']; // Obtiene el archivo
                $tempFilePath = $uploadedFile->getStream()->getMetadata('uri'); // Obtiene la secuencia de bytes (flujo de datos), despues obtenemos los metadatos en este caso URI. Todo para leer el archivo

                $file = fopen($tempFilePath, 'r'); // Abre el archivo en modo lectura
                $profesores = [];
                $modulos = [];


                $row = fgetcsv($file, 0, ";"); // Obtengo la primera fila del archivo

                if (count(array_diff(self::arrayProfesores, $row)) === 0) {
                    // Es un archivo de profesores
                    while (($row = fgetcsv($file, 0, ";")) !== false) {
                        $profesor = [
                            'email' => $row[0],
                            'password' => $this->hashPassword($row[1]),
                            'nombre' => $row[2],
                            'fecha_inicio' => $this->formatDate($row[3]),
                            'especialidad' => $row[4],
                            'departamento' => $args['id'],
                            'afin' => explode(",", $row[5]) 
                        ];
                        CSVModel::insertarProfesores($profesor); // Error
                    }
                } elseif (count(array_diff(self::arrayModulos, $row)) === 0) {
                    // Es un archivo de modulos

                    while (($row = fgetcsv($file, 0, ";")) !== false) {
                        $modulo[] = [
                            'nombre' => $row[0],
                            'departamento' => $row[1],
                            'tematica' => $row[2],
                            'especialidad' => $row[3],
                        ];
                    }
                }
                
                fclose($file);
                return $this->returnResponse($response, ["success" => "Archivo CSV valido"], 200);
            } else {
                // El archivo no es un CSV válido
                return $this->returnResponse($response, ["error" => "El archivo no esun CSV valido "], 400);
            }
        } else {
            // No se ha enviado ningún archivo o hay un error en la carga
            return $this->returnResponse($response, ["error" => "No se ha enviado ningún archivo o hay un error en la carga"], 400);
        }
    }

    private function esArchivoCSV($uploadedFile): bool
    {
        // Verifica la extensión del archivo
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
        return strtolower($extension) === 'csv';
    }
}
