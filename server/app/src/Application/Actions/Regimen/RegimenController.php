<?php

declare(strict_types=1);

namespace App\Application\Actions\Regimen;

use App\Application\Actions\Controller;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Application\db\Regimen\RegimenModel;

class RegimenController extends Controller
{

  /**
   * Lista los regímenes según en el ID.
   *
   * Este método recibe un ID y retorna una lista de regímenes asociados a ese ID.
   *
   * @param $request La solicitud HTTP.
   * @param $response La respuesta HTTP que se enviará.
   * @param $args Argumentos adicionales que contienen el 'id'.
   * @return $response devuelve la lista de regímenes.
   * 
   */

  public function listarRegimen(Request $request, Response $response, array $args)
  {
    $id = $args['id'];
    $res = RegimenModel::listarRegimen($id);
    return $this->returnResponse($response, $res, 200);
  }

  /**
   * Inserta un nuevo régimen en la base de datos.
   *
   * Este método recibe los datos de un nuevo régimen desde la solicitud HTTP y los inserta en la base de datos.
   *
   * @param $request La solicitud HTTP que contiene los datos del nuevo régimen.
   * @param $response La respuesta HTTP que se enviará.
   * @param $args Argumentos adicionales.
   * @return $response devuelve el resultado de la inserción.
   * 
   */
  public function inserirRegimen(Request $request, Response $response, array $args)
  {
    $data = $request->getParsedBody();
    $res = RegimenModel::inserirRegimen($data);
    return $this->returnResponse($response, $res, 200);
  }
}
