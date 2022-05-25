<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Priority::factory()->create(['title' => 'Hoch','slug' => 'high']);
        Priority::factory()->create(['title' => 'Mittel','slug' => 'medium']);
        Priority::factory()->create(['title' => 'Gering','slug' => 'low']);
    }
}
