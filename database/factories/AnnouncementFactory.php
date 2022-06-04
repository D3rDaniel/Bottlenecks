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

        return [
            'subject' => $this->faker->word,
            'message' => $this->faker->sentence,
            'user_id' => Project::all()->random()->creator_user_id,
            'project_id' => Project::all()->random()->id,
        ];
    }
}
