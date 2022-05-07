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

    public function user(){
        return $this->belongsTo(User::class,'creator_user_id');
    }

    public function tags(){
        return $this->hasMany(Tag::class);
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }
}
