<?php

namespace Database\Factories;

use \Todos\Domain\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends_ \Illuminate\Database\Eloquent\Factories\Factory<\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \Todos\Domain\Models\Project::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        return [
            'project_name' => $this->faker->text(20),
            'description' => $this->faker->text(100),
            'category_id' => $this->faker->numberBetween(1,5),
            'user_id' => $this->faker->numberBetween(1,5),
        ];
    }
}
