<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Priority;
use App\Models\Project;
use App\Models\Room;
use App\Models\Status;
use App\Models\Tag;
use App\Models\Task;
use App\Models\User;
use Database\Factories\TaskFactory;
use Database\Factories\UserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            ProjectSeeder::class,
            PrioritySeeder::class,
            StatusSeeder::class,
            TagSeeder::class,
            AnnouncementSeeder::class,
            TaskSeeder::class,
            RoomSeeder::class,
            BookingSeeder::class,
        ]);

    }
}
