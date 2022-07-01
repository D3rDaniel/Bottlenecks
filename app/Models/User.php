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

    /**
     * The projects that where created by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function createdProjects(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Project::class,'creator_user_id');
    }

    /**
     * The tasks that where created by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function createdTasks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Task::class,'creator_user_id');
    }

    /**
     * The tasks that where assigned to the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tasksAssigned(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Task::class,'assignee_user_id');
    }

    /**
     * The projects where the user is a member.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function projectsWhereMember(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Project::class,'project_users')
            ->withPivot(['can_edit_tasks','can_create_tasks','can_create_tags'])->as('user_project_rights');
    }

    /**
     * All bookings of the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function bookings(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * All announcements the user created.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function announcements(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Announcement::class);
    }

    /**
     * Checks if the user is owner of the project with
     * the specified id.
     *
     * @param $project_id
     * @return bool
     */
    public function isOwnerOfProject($project_id): bool
    {
        return $this->createdProjects()->where('id',$project_id)->exists();
    }

    /**
     * Checks if the user is a member of the project with
     * the specified id.
     *
     * @param $project_id
     * @return bool
     */
    public function isMemberOfProject($project_id): bool
    {
        return $this->projectsWhereMember()->where('project_id',$project_id)->exists();
    }

    /**
     * Checks if the user is allowed to create tasks in the project with
     * the specified id.
     *
     * @param $project_id
     * @return bool
     */
    public function canCreateTasks($project_id): bool
    {
        return $this->projectsWhereMember()->where('project_id',$project_id)->where('can_create_tasks','1')->exists();
    }

    /**
     * Checks if the user is allowed to create announcements in the project with
     * the specified id.
     *
     * @param $project_id
     * @return bool
     */
    public function canCreateAnnouncements($project_id): bool
    {
        return $this->projectsWhereMember()->where('project_id',$project_id)->where('can_create_announcements','1')->exists();
    }

    /**
     * Get the ProjectUser / Member Information for the project
     * whith the specified project_id and this user.
     *
     * @param int $project_id
     * @return ProjectUser
     */
    public function getUserProjectInformation(int $project_id): ProjectUser
    {
        return ProjectUser::where('user_id',$this->id)->where('project_id',$project_id)->first();
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
