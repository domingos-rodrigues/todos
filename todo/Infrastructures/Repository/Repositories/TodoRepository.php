<?php

namespace Todos\Infrastructures\Repository\Repositories;

use Todos\Domain\Models\Todo;
use Todos\Infrastructures\Repository\Contracts\Repositories\ITodoRepository;


class TodoRepository implements ITodoRepository
{

    public function getListTodosDB(): array
    {
        $result = Todo::all();
        return $result;
    }
}
