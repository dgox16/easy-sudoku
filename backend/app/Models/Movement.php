<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static where(string $string, mixed $game)
 * @method static create(array $array)
 */
class Movement extends Model
{
    protected $fillable = [
        'game_id',
        'current_grid',
        'number_movement',
        'is_winning_movement',
        'is_hint'
    ];

    protected $casts = [
        'current_grid' => 'array',
    ];

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}
