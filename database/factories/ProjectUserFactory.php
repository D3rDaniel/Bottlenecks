<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectUser>
 */
class ProjectUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_id= User::all()->random()->id;
        $project_id = Project::all()->random()->id;

            return [
                'user_id' => $user_id,
                'project_id' => $project_id,
                'can_create_tasks' => $this->faker->numberBetween(0,  1),
                'can_edit_tasks' => $this->faker->numberBetween(0,  1),
                'can_create_announcements' => $this->faker->numberBetween(0,  1),
                'can_create_tags'   => $this->faker->numberBetween(0,  1),
            ];

    }
    public function createAdmin($project){
        $projectUser = new ProjectUser();
        $projectUser->fill([
            //TODO:???
            'user_id' => $project->creator()->get('id')->pluck('id')->first(),
            'project_id' =>$project->id,
            'can_create_tasks' => 1,
            'can_edit_tasks' => 1,
            'can_create_tags'   => 1,
            'can_create_announcements'   => 1,
        ]);
        $projectUser->save();
    }
}
