<?php

namespace Todos\Infrastructures\Repository\Contracts\Repositories;

interface ITodoRepository
{
    public function getListTodosDB(): array;
}
