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
            self::EASY => 42,
            self::MEDIUM => 46,
            self::HARD => 50,
            self::INSANE => 54,
        };
    }
}
