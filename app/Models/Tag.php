<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;

class Tag extends Model
{
    use HasFactory;


    protected $fillable = [
        'tag_name',
        'tag_description',
        'project_id'
    ];

    public function project()
    {
        return $this->belongsToOne(Project::class, 'project_id');
    }
}
