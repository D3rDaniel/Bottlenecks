<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $created_at = $this->faker->dateTimeBetween(now()->modify('-1 year'),now()->modify('+1 year'));
        $due_date = $this->faker->dateTimeBetween($created_at, '+1 years');
        if($due_date<now()){
            $due_date_start = clone $due_date;
            $completion_date = $this->faker->dateTimeBetween($due_date_start->modify('-1 month'), $due_date->modify('+1 week'));
        }
        else{
            $completion_date=null;
        }
        return [
            'created_at' => $created_at,
            'title' => $this->faker->sentence,
            'description' => $this->faker->sentence,
            'creator_user_id' => User::all()->random()->id, //create a new user
            'due_date' => $due_date,
            'completion_date' => $completion_date,
        ];
    }
}
