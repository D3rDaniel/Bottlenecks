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

    public function projectOwner(){
        return $this->hasMany(Project::class,'creator_user_id');
    }

    public function createdTasks(){
        return $this->hasMany(Task::class,'creator_user_id');
    }

    public function assignedTasks(){
        return $this->hasMany(Task::class,'assignee_user_id');
    }

    public function projectMember(){
        return $this->hasMany(ProjectMember::class);
    }

    public function bookings(){
        return $this->hasMany(Booking::class);
    }

    public function announcements(){
        return $this->hasMany(Announcement::class);
    }

    public function projectInvitationsIssued(){
        return $this->hasMany(ProjectInvite::class,'inviter_user_id');
    }

    public function projectInvitationsReceived(){
        return $this->hasMany(ProjectInvite::class,'invited_user_id');
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
        'created_at',
        'updated_at',
        'first_name',
        'last_name'
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
