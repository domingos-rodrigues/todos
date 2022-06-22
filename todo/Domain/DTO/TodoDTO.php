<?php

namespace Todos\Domain\DTO;

use Todos\Domain\Models\Todo;
use Spatie\DataTransferObject\DataTransferObject;


class TodoDTO extends DataTransferObject
{
    /** @var string */
    public string $todo;

    /** @var integer */
    public int $project_id;

    /**
     * @throws \Spatie\DataTransferObject\Exceptions\UnknownProperties
     */
    public static function fromRequest(TodoRequest $todoRequest): TodoDTO
    {
        return new Self([
            'todo' => $todoRequest['todo'],
            'project_id' => $todoRequest['project_id'],
        ]);
    }
}
