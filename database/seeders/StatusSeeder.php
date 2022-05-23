<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Status::factory()->create(['title' => 'Erledigt','slug' => 'completed']);
        Status::factory()->create(['title' => 'In Arbeit','slug' => 'in-progress']);
        Status::factory()->create(['title' => 'Pausiert','slug' => 'paused']);
        Status::factory()->create(['title' => 'Fehlgeschlagen','slug' => 'failed']);
    }
}
