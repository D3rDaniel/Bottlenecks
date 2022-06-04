<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'creator_user_id',
        'due_date',
        'completed_date'
    ];

    /**
     * Get the user that owns the project.
     *
     * @return BelongsTo
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class,'creator_user_id');
    }

    /**
     * Get the tags associated with the project.
     *
     * @return hasMany
     */
    public function tags(){
        return $this->hasMany(Tag::class);
    }

    /**
     * Get the tasks associated with the project.
     *
     * @return hasMany
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Get the members of the project with all their rights.
     *
     * @return belongsToMany
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class,'project_users','project_id','user_id')
            ->withPivot('user_id','project_id','can_create_tasks','can_edit_tasks','can_create_tags');
    }

    /**
     * Get all rooms of the project.
     *
     * @return hasMany
     */
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    /**
     * Calculates the number of tasks that are completed.
     *
     * @return integer Percentage of completed tasks
     */
    public function calculateProgress(): int
    {
        $totalTasks = $this->tasks()->count();
        $completedTasks = $this->tasks()->where('status_id',1)->count();
        return ($totalTasks > 0) ? round(($completedTasks / $totalTasks) * 100) : 0;
    }
}
