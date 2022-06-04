<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable=[
        'title',
        'description',
        'creator_user_id',
        'assignee_user_id',
        'due_date',
        'completed_date',
        'due_time',
        'completed_time',
        'project_id',
        'status_id',
        'priority_id',
        'tag_id',
        'completion_comment'
    ];

    /**
     * Get the priority of the task.
     *
     * @return BelongsTo
     */
    public function priority(): BelongsTo
    {
        return $this->belongsTo(Priority::class);
    }

    /**
     * Get the project the task belongs to.
     *
     * @return BelongsTo
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the status of the task.
     *
     * @return BelongsTo
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    /**
     * Get the creator of the task.
     *
     * @return BelongsTo user that created the task
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class,'creator_user_id');
    }

    /**
     * Get the assignee of the task.
     *
     * @return BelongsTo user the task is assigned to
     */
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class,'assignee_user_id');
    }

    /**
     * Get the tag of the task.
     *
     * @return BelongsTo
     */
    public function tag(): BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }
}
