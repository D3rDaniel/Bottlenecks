<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectUser;
use Database\Factories\ProjectUserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = Project::all();
        foreach ($projects as $project){
            ProjectUser::factory()->createAdmin($project);
        }
        ProjectUser::factory(200)->create();
    }
}
