<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;

class Tag extends Model
{
    use HasFactory;


    protected $fillable = [
        'title',
        'description',
        'project_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function project()
    {
        return $this->belongsToOne(Project::class, 'project_id');
    }
}
