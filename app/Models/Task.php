<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'tag_id'
    ];

    public function priority()
    {
        return $this->hasOne(Priority::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function status()
    {
        return $this->hasOne(Status::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class,'creator_user_id');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class,'assignee_user_id');
    }
}
