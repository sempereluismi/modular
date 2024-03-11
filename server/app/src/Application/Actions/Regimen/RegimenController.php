<?php

declare(strict_types=1);

namespace App\Application\Actions\Regimen;

use App\Application\Actions\Controller;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Application\db\Regimen\RegimenModel;

class RegimenController extends Controller
{
  public function listarRegimen(Request $request, Response $response, array $args)
  {
    $id = $args['id'];
    $res = RegimenModel::listarRegimen($id);
    return $this->returnResponse($response, $res, 200);
  }
}
