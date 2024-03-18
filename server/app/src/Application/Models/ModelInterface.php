<?php
declare(strict_types=1);

namespace App\Application\Models;

Interface ModelInterface
{
    public function getData() : array;
}