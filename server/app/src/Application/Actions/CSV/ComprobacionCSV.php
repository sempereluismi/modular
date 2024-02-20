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

        // Verficamos que tengamos un archivo csv
        if (ComprobacionCSV::esArchivoCSV($uploadedFiles['csvFile'])) {
            // Procesa el archivo csv
            $response->getBody()->write('Archivo CSV válido');
        } else {
            $response->getBody()->write('El archivo no es un CSV válido');
        }

        return $response;
    }

    private static function esArchivoCSV($uploadedFile): bool
    {
        //Verificamos que se haya enviado un archivo
        if (!$uploadedFile instanceof \Slim\Psr7\UploadedFile) {
            return false;
        }

        $stream = $uploadedFile->getStream();

        // Verificamos que tenga la extensión CSV
        $fileType = mime_content_type((string) $stream);
        return $fileType === 'text/csv';
    }
}
