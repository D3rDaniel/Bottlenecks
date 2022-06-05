<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $project = Project::all()->random();
        $members = $project->members()->get();
        $creator = $this->getRandomUser($members,$project->id);

        return [
            'subject' => $this->faker->word,
            'message' => $this->faker->sentence,
            'user_id' => $creator,
            'project_id' => $project,
        ];
    }
    private function getRandomUser($members,$project_id){
        $num = $this->faker->numberBetween(0,count($members)-1);
        if($members[$num]->canCreateAnnouncements($project_id)){
            return $members[$num];
        }
        else{
            $this->getRandomUser($members,$project_id);
        }
    }
}
