<?php

namespace Todos\Domain\DTO;

use Todos\Domain\Models\Project;
use Spatie\DataTransferObject\DataTransferObject;


class ProjectDTO extends DataTransferObject
{
    /** @var string */
    public $project;

    /** @var string */
    public  $category;


    /**
     * @throws \Spatie\DataTransferObject\Exceptions\UnknownProperties
     */
    public static function fromRequest(ProjectRequest $projectRequest): ProjectDTO
    {
        return new Self([
            'project_name' => $projectRequest['project'],
            'category' => $projectRequest['category'],
        ]);
    }
}
