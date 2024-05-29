<?php

namespace App\Application\Actions\CSV;

use App\Application\Actions\Controller;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\db\CSV\CSVModel;

class ComprobacionCSV extends Controller
{

    const arrayProfesores = ["email", "password", "nombre", "fecha_inicio", "especialidad", "afin"];
    const arrayModulos = ["nombre", "tematica", "especialidad", "regimen", "ciclo", "horas"];
    public function uploadFiles(Request $request, Response $response, array $args)
    {

        // Obtenemos los archivos subidos
        $uploadedFiles = $request->getUploadedFiles();
        
        // Verificamos que se haya enviado un archivo y es un CSV
        if (isset($uploadedFiles['csvFile']) && $uploadedFiles['csvFile']->getError() === UPLOAD_ERR_OK) {
            if ($this->esArchivoCSV($uploadedFiles['csvFile'])) { // Comprobar los priemros campos del archivo
                $uploadedFile = $uploadedFiles['csvFile']; // Obtiene el archivo
                $tempFilePath = $uploadedFile->getStream()->getMetadata('uri'); // Obtiene la secuencia de bytes (flujo de datos), despues obtenemos los metadatos en este caso URI. Todo para leer el archivo
                
                $file = fopen($tempFilePath, 'r'); // Abre el archivo en modo lectura
                $profesores = [];
                $modulos = [];
                
                
                $row = fgetcsv($file, 0, ";"); // Obtengo la primera fila del archivo
                if (count(array_diff(self::arrayProfesores, $row)) === 0) {
                    // Es un archivo de profesores
                    while (($row = fgetcsv($file, 0, ";")) !== false) {
                        $profesores = [
                            'email' => $row[0],
                            'password' => $this->hashPassword($row[1]),
                            'nombre' => $row[2],
                            'fecha_inicio' => $this->formatDate($row[3]),
                            'especialidad' => $row[4],
                            'departamento' => $args['id'],
                            'afin' => explode(",", $row[5])
                        ];
                        // A partir de aqui $profesores es un array y devuelve todo bien
                        try {
                            $res = CSVModel::insertarProfesores($profesores);

                        } catch (\Exception $e) {
                            return $this->returnResponse($response, ["error" => $e->getMessage()], $e->getCode());
                        }
                    }
                    fclose($file);
                    return $this->returnResponse($response, ["success" => "Profesores añadidos con exito"], 200);
                } elseif (count(array_diff(self::arrayModulos, $row)) === 0) {
                    // Es un archivo de modulos

                    while (($row = fgetcsv($file, 0, ";")) !== false) {
                        $modulos = [
                            'nombre' => $row[0],
                            'departamento' => $args['id'],
                            'tematica' => $row[1],
                            'especialidad' => $row[2],
                            'regimen' => $row[3],
                            'ciclo' => $row[4],
                            'horas' => $row[5]
                        ];
                        try {
                            CSVModel::insertarModulos($modulos);
                        } catch (\Exception $e) {
                            return $this->returnResponse($response, ["error" => $e->getMessage()], $e->getCode());
                        }
                    }
                    fclose($file);
                    return $this->returnResponse($response, ["success" => "Archivo CSV valido"], 200);

                }
                fclose($file);
                return $this->returnResponse($response, ["error" => "El archivo no tiene un formato valido"], 400);
            } else {
                // El archivo no es un CSV válido
                return $this->returnResponse($response, ["error" => "El archivo no esun CSV valido "], 400);
            }
        } else {
            // No se ha enviado ningún archivo o hay un error en la carga
            return $this->returnResponse($response, ["error" => "No se ha enviado ningún archivo o hay un error en la carga"], 400);
        }
    }

    public function saveFiles(Request $request, Response $response, array $args)
    {
        return $this->returnResponse($response, ["success" => "Archivo CSV guardado"], 200);
        $uploadedFiles = $request->getUploadedFiles();
        if (isset($uploadedFiles['file']) && $uploadedFiles['file']->getError() === UPLOAD_ERR_OK) {
            if($this->esArchivoCSV($uploadedFiles['file'])) {
                $uploadedFile = $uploadedFiles['file'];
                // try {
                //     CSVModel::saveFiles($uploadedFile);
                //     return $this->returnResponse($response, ["success" => "Archivo CSV guardado"], 200);
                // } catch (\Exception $e) {
                //     return $this->returnResponse($response, ["error" => $e->getMessage()], $e->getCode());
                // }
            }
        }
    }

    private function esArchivoCSV($uploadedFile): bool
    {
        // Verifica la extensión del archivo
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
        return strtolower($extension) === 'csv';
    }

    private function formatDate($fechaInicio)
    {
        return date('Y-m-d', strtotime($fechaInicio));
    }

    private function hashPassword($password)
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }
}
