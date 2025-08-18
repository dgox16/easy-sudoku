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
            self::EASY => 44,
            self::MEDIUM => 48,
            self::HARD => 52,
            self::INSANE => 56,
        };
    }
}
