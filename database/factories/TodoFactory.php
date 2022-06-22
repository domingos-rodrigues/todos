<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Todos\Domain\Models\Todo;
use Illuminate\Support\Str;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Todos\Domain\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(['todo_name' => "string", 'description' => "string"])]
    public function definition(): array
    {
        return [
            'todo_name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'project_id' => $this->faker->numberBetween(1,5),
        ];
    }
}
