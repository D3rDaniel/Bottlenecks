<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $start_epoch = strtotime($this->faker->time);
        $opening_time= date('H:i:s', $start_epoch);
        $end_epoch = rand($start_epoch,86400);
        $closing_time =date('H:i:s', $end_epoch);
        return [
            'title' => $this->faker->word,
            'description' => $this->faker->sentence,
            'room_number' => $this->faker->regexify('[A-H][0-4][1-9]{2}'),
            'capacity' => $this->faker->numberBetween(1,30),
            'equipment_info' => $this->faker->sentence,
            'address_info' => $this->faker->streetAddress() . ' ' . $this->faker->postcode()  .',' . $this->faker->city(),
            'opening_time' =>   $opening_time,
            'closing_time' =>   $closing_time,
            'opened_on_weekends' => $this->faker->numberBetween(0,1),
            'project_id' => Project::all()->random()->id
        ];
    }
}
