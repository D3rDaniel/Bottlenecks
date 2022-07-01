<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    /**
     * The bookings for this room.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * The project this room was created in.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

}
