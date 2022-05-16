<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Project;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'first_name',
        'last_name',
        'email_verified_at',
    ];

    public function createdProjects(){
        return $this->hasMany(Project::class,'creator_user_id');
    }

    public function createdTasks(){
        return $this->hasMany(Task::class,'creator_user_id');
    }

    public function tasksAssigned(){
        return $this->hasMany(Task::class,'assignee_user_id');
    }

    public function projects(){
        return $this->belongsToMany(Project::class,'project_users')
            ->withPivot(['can_edit_tasks','can_create_tasks','can_assign_tasks','can_create_tags'])->as('user_project_rights');
    }

    public function bookings(){
        return $this->hasMany(Booking::class);
    }

    public function announcements(){
        return $this->hasMany(Announcement::class);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'updated_at',
        'created_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
