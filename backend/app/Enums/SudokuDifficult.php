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
            self::EASY => 35,
            self::MEDIUM => 40,
            self::HARD => 45,
            self::INSANE => 52,
        };
    }
}
