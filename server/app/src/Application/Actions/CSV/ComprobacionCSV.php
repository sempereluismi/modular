<?php

namespace App\Application\Actions\CSV;

use App\Application\Actions\Controller;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ComprobacionCSV extends Controller
{
    public function uploadFiles(Request $request, Response $response)
    {
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

                for ($i = 0; $i < 3; $i++) {
                    $row = fgetcsv($file); // Obtiene una fila del archivo CSV
                    if ($row == !false) {
                        $profesores[] = [
                            'nombre' => $row[0],
                            'apellido' => $row[1],
                            // Las que necesitemos...
                        ];
                    } else {
                        break; //Salimos del bucle
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
