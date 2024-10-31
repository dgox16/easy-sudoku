<?php
namespace App\Enums;

enum SudokuDifficult: int
{
    case EASY = 19;
    case MEDIUM = 28;
    case HARD = 37;
    case VERY_HARD = 46;
    case INSANE = 55;
    case INHUMAN = 64;
}
