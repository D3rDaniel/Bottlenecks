<?php

namespace App\Providers;

use App\Models\Project;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Models\Project' => 'App\Policies\ProjectPolicy',
        'App\Models\Task' => 'App\Policies\TaskPolicy',
        'App\Models\Room' => 'App\Policies\RoomPolicy',
        'App\Models\Booking' => 'App\Policies\BookingPolicy',
        'App\Models\Announcement' => 'App\Policies\AnnouncementPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
