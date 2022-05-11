<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectInvite extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function userInvited()
    {
        return $this->belongsTo(User::class,'invited_user_id');
    }

    public function userInviting()
    {
        return $this->belongsTo(User::class,'invitor_user_id');
    }

}
