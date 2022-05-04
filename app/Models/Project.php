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
        'description'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function tags(){
        return $this->hasMany(Tag::class);
    }
}