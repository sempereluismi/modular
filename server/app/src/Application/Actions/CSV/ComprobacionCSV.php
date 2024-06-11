<?php

namespace App\Application\Actions\CSV;

use App\Application\Actions\Controller;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Application\db\CSV\CSVModel;


/**
 * Clase ComprobacionCSV
 *
 * Esta clase maneja la carga, verificación y procesamiento de archivos CSV para profesores y módulos.
 */
class ComprobacionCSV extends Controller
{

    const arrayProfesores = ["email", "password", "nombre", "fecha_inicio", "especialidad", "afin"];
    const arrayModulos = ["nombre", "tematica", "especialidad", "regimen", "ciclo", "horas"];

    /**
     * Maneja la carga de archivos CSV y procesa su contenido.
     *
     * Este método procesa archivos CSV subidos y los inserta en la base de datos.
     * Soporta archivos de profesores y módulos, identificados por los encabezados del CSV.
     *
     * @param Request $request La solicitud HTTP que contiene los archivos subidos.
     * @param Response $response La respuesta HTTP que se enviará.
     * @param array $args Argumentos adicionales, que incluyen el 'id' necesario para la inserción de datos.
     * @return Response Devuelve success si los profesores/módulos se han añadido correctamente, error si ha ocurrido algún fallo.
     * 
     */
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

    /**
     * Maneja la carga de archivos CSV y guarda su contenido.
     *
     * @param $request La solicitud HTTP que contiene los archivos subidos.
     * @param $response La respuesta HTTP que se enviará.
     * @param $args Argumentos adicionales, que incluyen el 'id' necesario para guardar los archivos.
     * @return $response devuelve Success si se ha hecho correctamento, error si el archivo no es un csv válido o algo ha fallado.
     * 
     */
    public function saveFiles(Request $request, Response $response, array $args)
    {
        $uploadedFiles = $request->getUploadedFiles();

        if (isset($uploadedFiles['csvFile']) && $uploadedFiles['csvFile']->getError() === UPLOAD_ERR_OK) {
            $uploadedFile = $uploadedFiles['csvFile'];

            if ($this->esArchivoCSV($uploadedFile)) {
                $contenido = file_get_contents($uploadedFile->getStream()->getMetadata('uri'));
                CSVModel::saveFiles($contenido, $args['id']);
                return $this->returnResponse($response, ["success" => "Archivo CSV válido"], 200);
            } else {
                return $this->returnResponse($response, ["error" => "El archivo no es un CSV válido"], 400);
            }
        } else {
            return $this->returnResponse($response, ["error" => "No se ha subido ningún archivo o ha ocurrido un error"], 400);
        }
    }


    public function listFilesProfesor(Request $request, Response $response, array $args)
    {
        $files = CSVModel::listFilesProfesor($args['id']);
        return $this->returnResponse($response, $files, 200);
    }

    public function listFileAdmin(Request $request, Response $response, array $args)
    {
        try {
            $files = CSVModel::listFileAdmin($args['id']);
        } catch (\Exception $e) {
            return $this->returnResponse($response, ["error" => $e->getMessage()], $e->getCode());
        }
        return $this->returnResponse($response, $files, 200);
    }

    /**
     * Verifica si un archivo subido es un archivo CSV.
     *
     * @param $uploadedFile El archivo subido a verificar.
     * @return bool True si el archivo es un archivo CSV válido, de lo contrario false.
     * 
     */
    private function esArchivoCSV($uploadedFile): bool
    {
        if (empty($uploadedFile) || !is_uploaded_file($uploadedFile->getStream()->getMetadata('uri'))) {
            return false;
        }


        $fileExtension = strtolower(pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION));

        if ($fileExtension !== 'csv') {
            return false;
        }

        $fileMimeType = mime_content_type($uploadedFile->getStream()->getMetadata('uri'));

        $allowedMimeTypes = [
            'text/csv',
            'text/plain',
            'application/csv',
            'text/comma-separated-values',
            'application/excel',
            'application/vnd.ms-excel',
            'application/vnd.msexcel',
            'text/anytext',
            'application/octet-stream',
            'application/txt',
        ];

        if (!in_array($fileMimeType, $allowedMimeTypes)) {
            return false;
        }

        return true;
    }

    /**
     * Esta función lo que hace es pasar un String a formato de fecha.
     * 
     * Se le pasa como parámetro un String y devuelve un date.
     * 
     * @param $fechaInicio La fecha en String
     * @return date La fecha ya formateada
     * 
     */
    private function formatDate($fechaInicio)
    {
        return date('Y-m-d', strtotime($fechaInicio));
    }

    /**
     * 
     * Como parámetro recibe una contraseña y la devuelve hasheada.
     * 
     * @param $password La contraseña
     * @return $password_hash La contraseña ya hasheada
     * 
     */
    private function hashPassword($password)
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }
}
