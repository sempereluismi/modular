<?php

namespace App\Application\Actions\CSV;

use App\Application\Actions\Controller;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ComprobacionCSV extends Controller
{
    
    const arrayProfesores = ["email", "password", "nombre", "fecha_inicio", "especialidad", "departamento" ];
    const arrayModulos = ["nombre", "departamento", "tematica", "especialidad"];
    public function uploadFiles(Request $request, Response $response)
    {

        function formatDate($fechaInicio) {
            $fechaInicioArray = explode('-', $fechaInicio);
            $año = $fechaInicioArray[2];
            $mes = $fechaInicioArray[1];
            $dia = $fechaInicioArray[0];
            return compact('año', 'mes', 'dia');
        }
        
        function hashPassword($password) {
            return password_hash($password, PASSWORD_DEFAULT);
        }

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
                // Define the missing constant 'arrayProfesores' and initialize it with an empty array

                if(count(array_diff(self::arrayProfesores, $row)) === 0 ){
                    // Es un archivo de profesores
                    
                    while(($row = fgetcsv($file, 0, ";")) !== false){
                        $profesores[] = [
                            'email' => $row[0],
                            'password' => hashPassword($row[1]),
                            'nombre' => $row[2],
                            'fecha_inicio' => formatDate($row[3]),
                            'especialidad' => $row[4],
                            'departamento' => $row[5]
                        ];
                    }

                }elseif (count(array_diff(self::arrayModulos, $row)) === 0) {
                    // Es un archivo de modulos
                
                    while(($row = fgetcsv($file, 0, ";")) !== false){
                        $modulos[] = [
                            'nombre' => $row[0],
                            'departamento' => $row[1],
                            'tematica' => $row[2],
                            'especialidad' => $row[3],
                        ];
                    }


                }
            //     while(($column = fgetcsv($file, 0, ";")) == !false){ // Minetras siga leyendo filas en el archivo sigue el bucle
            //     for ($i = 0; $i < 3; $i++) {
                    
            //         $firstColumn = strtolower($column[0]); // Suponemos que el primer campo es el que determina si entra en profesores o modulos
            //         // Comparar arrays con array diff
            //         if ($firstColumn === 'nombre') {
            //             $profesores[] = [
            //                 'nombre' => $column[0], // Suponemos que todas estas filas son x dato (Cambiar seguramente)
            //                 'apellido' => $column[1],
            //                 // Las que necesitemos...
            //             ];
            //         } elseif ($firstColumn === 'modulo') {
            //             $modulos[] = [
            //                 'modulo' => $column[0], // Suponemos que todas estas filas son x dato (Cambiar seguramente)
            //                 'horas' => $column[1],
            //                 // Las que necesitemos...
            //             ];
            //         }
            //     }
            // }

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
