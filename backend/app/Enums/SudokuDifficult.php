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
            self::EASY => 37,
            self::MEDIUM => 42,
            self::HARD => 47,
            self::INSANE => 52,
        };
    }
}
