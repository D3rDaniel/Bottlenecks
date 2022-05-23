<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Nette\Utils\DateTime;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $project = Project::all()->random();
        $status_id = rand(1, 4);
        $due_date = $this->faker->dateTimeBetween($project->created_at, new DateTime($project->due_date));
        if($status_id==1||$status_id==4){
            $completed_date = $this->faker->dateTimeBetween($project->created_at, new DateTime($project->due_date));
            $completed_time = $this->faker->time;
        }
        else{
            $completed_date = null;
            $completed_time = null;
        }

        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->text,
            'creator_user_id' => User::all()->random()->id,
            'assignee_user_id' => User::all()->random()->id,
            'due_date' => $due_date,
            'completed_date' => $completed_date,
            'due_time' => $this->faker->time,
            'completed_time' => $completed_time,
            'project_id' => $project->id,
            'status_id' => rand(1, 4),
            'priority_id' => rand(1,3),
            'tag_id' => Project::all()->random()->id,
        ];
    }
}
