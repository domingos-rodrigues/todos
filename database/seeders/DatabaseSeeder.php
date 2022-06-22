<?php

namespace Database\Seeders;

//use App\Domain\Courses\Models\Course;
use Database\Factories\TodoFactory;
use Database\Factories\BakProjectFactoryB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Todos\Domain\Models\Project;



class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();
        \App\Models\Project::factory(5)->create();
        \App\Models\Todo::factory()->count(30)->create();
//        $this->call(ProjectSeeder::class);
//        $this->call(TodoFactory::class);
    }
}
