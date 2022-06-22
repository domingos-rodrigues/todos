<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Project>
 */
class BakProjectFactoryB extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
//    #[ArrayShape(['project_name' => "string", 'email' => "string", 'email_verified_at' => "\Illuminate\Support\Carbon", 'password' => "string", 'remember_token' => "string"])]
    public function definition()
    {
        return [
            'project_name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'user_id' => 1,
        ];
    }
}
