<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Tag;

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


    public function creator(){
        return $this->belongsTo(User::class,'creator_user_id');
    }

    public function tags(){
        return $this->hasMany(Tag::class);
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function members(){
        return $this->belongsToMany(User::class,'project_users','project_id','user_id')
            ->withPivot('user_id','project_id');
    }

    public function calculateProgress(){
        $totalTasks = $this->tasks()->count();
        $completedTasks = $this->tasks()->where('status_id',1)->count();
        $progress = ($totalTasks > 0) ? round(($completedTasks / $totalTasks) * 100) : 0;
        return $progress;
    }
}
