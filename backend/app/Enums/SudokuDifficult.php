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
            self::EASY => 40,
            self::MEDIUM => 44,
            self::HARD => 48,
            self::INSANE => 52,
        };
    }
}
