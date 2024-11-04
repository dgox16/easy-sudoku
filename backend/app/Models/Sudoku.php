<?php

namespace App\Models;

use App\Enums\SudokuDifficult;
use Illuminate\Database\Eloquent\Model;

/**
 * @property false|mixed|string $solution
 * @property false|mixed|string $grid
 * @property SudokuDifficult|mixed $difficult
 */
class Sudoku extends Model
{
    protected $casts = [
        'difficulty' => SudokuDifficult::class,
        'grid' => 'array',
    ];
}
