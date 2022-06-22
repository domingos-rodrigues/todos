<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Database\Factories\BakProjectFactoryB;
use Todos\Domain\Models\Project;


class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        BakProjectFactoryB::factory(10)->create();
        $proj_1 = Project::create(['project_name' => $this->faker->name(),'description' => $this->faker->text(), 'user_id' => 3]);
        $proj_2 = Project::create(['project_name' => $this->faker->name(),'description' => $this->faker->text(), 'user_id' => 2]);
        $proj_3 = Project::create(['project_name' => $this->faker->name(),'description' => $this->faker->text(), 'user_id' => 1]);
        $proj_4 = Project::create(['project_name' => $this->faker->name(),'description' => $this->faker->text(), 'user_id' => 3]);
    }
}
