<?php

namespace App\Application\Actions\CSV;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ComprobacionCSV
{

    public function uploadFiles(Request $request, Response $response)
    {
        // Obtenemos los archivos subidos
        $uploadedFiles = $request->getUploadedFiles();
        // Verificamos que se haya enviado un archivo y es un CSV
        if (isset($uploadedFiles['csvFile']) && $uploadedFiles['csvFile']->getError() === UPLOAD_ERR_OK) {
            if ($this->esArchivoCSV($uploadedFiles['csvFile'])) {
                // Procesa el archivo csv
                $response->getBody()->write('Archivo CSV válido');
            } else {
                $response->getBody()->write('El archivo no es un CSV válido');
            }
        } else {
            $response->getBody()->write('No se ha enviado ningún archivo o hay un error en la carga');
        }

        return $response;
    }
    private function esArchivoCSV($uploadedFile): bool
    {
        // Verifica la extensión del archivo
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
        return strtolower($extension) === 'csv';
    }
}