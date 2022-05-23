<?php

namespace Database\Factories;

use App\Models\Project;
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
        $admin = Project::find($project_id)->where('creator_user_id',$user_id);
        if($admin){
            return [
                'user_id' => $user_id,
                'project_id ' =>$project_id,
                'can_create_tasks' => 1,
                'can_edit_tasks' => 1,
                'can_assign_tasks' => 1,
                'can_create_tags'   => 1,
            ];
        }
        else{
            return [
                'user_id' => $user_id,
                'project_id ' => $project_id,
                'can_create_tasks' => $this->faker->numberBetween(0,  1),
                'can_edit_tasks' => $this->faker->numberBetween(0,  1),
                'can_assign_tasks' => $this->faker->numberBetween(0,  1),
                'can_create_tags'   => $this->faker->numberBetween(0,  1),
            ];
        }
    }
}
