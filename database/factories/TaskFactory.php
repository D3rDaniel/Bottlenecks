<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->text,
            'creator_user_id' => 1,
            'assignee_user_id' => 1,
            'due_date' => $this->faker->dateTimeBetween('-1 years', '+1 years'),
            'completed_date' => null,
            'due_time' => $this->faker->time,
            'completed_time' => null,
            'project_id' => 1,
            'status_id' => rand(1, 4),
            'priority_id' => rand(1,3),
            'tag_id' => null,
        ];
    }
}
