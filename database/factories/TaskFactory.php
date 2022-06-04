<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Tag;
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
        if($project->created_at>=new DateTime($project->due_date)){
            $due_date = $project->created_at->modify('+1 day');
        }
        else{
            $due_date = $this->faker->dateTimeBetween($project->created_at, new DateTime($project->due_date));
        }
        $members = $project->members()->get();
        $creator = $this->getRandomUser($members,$project->id);
        if($status_id==1||$status_id==4){
            if($project->created_at>=new DateTime($project->due_date)){
                $completed_date = $project->created_at->modify('+1 day');
            }
            else{
                $completed_date = $this->faker->dateTimeBetween($project->created_at, new DateTime($project->due_date));
            }
            $completed_time = $this->faker->time;
        }
        else{
            $completed_date = null;
            $completed_time = null;
        }

        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->text,
            'creator_user_id' => $creator,
            'assignee_user_id' => $members[$this->faker->numberBetween(0,count($members)-1)],
            'due_date' => $due_date,
            'completed_date' => $completed_date,
            'due_time' => $this->faker->time,
            'completed_time' => $completed_time,
            'project_id' => $project->id,
            'status_id' => rand(1, 4),
            'priority_id' => rand(1,3),
            'tag_id' => Tag::all()->random()->id,
        ];
    }
    private function getRandomUser($members,$project_id){
        $num = $this->faker->numberBetween(0,count($members)-1);
        if($members[$num]->canCreateTasks($project_id)){
            return $members[$num];
        }
        else{
            $this->getRandomUser($members,$project_id);
        }
    }
}
