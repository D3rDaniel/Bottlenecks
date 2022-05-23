<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $room = Room::all()->random();
        $reservation_date = $this->faker->dateTimeBetween(now()->modify('-1 month'),now()->modify('+1 month'));

        $min_epoch = strtotime($room->start_time);
        $max_epoch = strtotime($room->end_time);
        $start_epoch = rand($min_epoch, $max_epoch);
        $start_time= date('H:i:s', $start_epoch);
        $end_epoch = rand($start_epoch, $max_epoch);
        $end_time=date('H:i:s', $end_epoch);
        return [
            'room_id' => $room->id,
            'user_id' => User::all()->random()->id,
            'reservation_date' => $reservation_date,
            'start_time' => $start_time,
            'end_time' => $end_time,
        ];
    }


}
