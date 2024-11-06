<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    protected $fillable = [
        'game_id',
        'current_grid',
        'number_movement',
        'is_winning_movement',
    ];

    protected $casts = [
        'current_grid' => 'array',
    ];
}
