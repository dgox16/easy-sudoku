<?php
namespace App\Enums;

enum SudokuDifficult: string
{
    case EASY = 'easy';
    case MEDIUM = 'medium';
    case HARD = 'hard';
    case INSANE = 'insane';
    public function getCount(): int
    {
        return match ($this) {
            self::EASY => 19,
            self::MEDIUM => 28,
            self::HARD => 37,
            self::INSANE => 50,
        };
    }
}
