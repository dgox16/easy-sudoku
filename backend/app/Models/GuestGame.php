<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed $sudoku_id
 */
class GuestGame extends Model
{
    protected $fillable = [
        'sudoku_id',
        'finished'
    ];
}
