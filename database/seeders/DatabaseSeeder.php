<?php

namespace Database\Seeders;

use App\Models\Priority;
use App\Models\Project;
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

         $high =Priority::factory()->create(['title' => 'Hoch']);
         $middle =Priority::factory()->create(['title' => 'Mittel']);
         $low =Priority::factory()->create(['title' => 'Gering']);

         $done =Status::factory()->create(['title' => 'Erledigt']);
         $in_progress =Status::factory()->create(['title' => 'In Arbeit']);
         $on_hold =Status::factory()->create(['title' => 'Pausiert']);
         $failed =Status::factory()->create(['title' => 'Fehlgeschlagen']);

         User::factory(5)->create();

         Project::factory(1)->create(['creator_user_id' => 1]);
         Project::factory(1)->create(['creator_user_id' => 2]);
         Project::factory(1)->create(['creator_user_id' => 3]);

         Tag::factory(3)->create(['project_id' => 1]);
         Tag::factory(3)->create(['project_id' => 2]);
         Tag::factory(1)->create(['project_id' => 3]);

         Task::factory(3)->create(['project_id' => 1, 'status_id' => $in_progress->id, 'priority_id' => $high->id,'tag_id' => 1, 'creator_user_id' => 1, 'assignee_user_id' => 1]);
         Task::factory(2)->create(['project_id' => 1, 'status_id' => $on_hold->id, 'priority_id' => $low->id,'creator_user_id' => 1, 'assignee_user_id' => 1]);
         Task::factory(2)->create(['project_id' => 1, 'status_id' => $done->id, 'priority_id' => $middle->id, 'creator_user_id' => 1, 'assignee_user_id' => 1]);

        Task::factory(4)->create(['project_id' => 2, 'status_id' => $in_progress->id, 'priority_id' => $middle->id, 'creator_user_id' => 2, 'assignee_user_id' => 2]);

        Task::factory(3)->create(['project_id' => 3, 'status_id' => $in_progress->id, 'priority_id' => $high->id, 'creator_user_id' => 3, 'assignee_user_id' => 3]);

    }
}
