<?php

namespace App\Helpers;

use App\Enums\SudokuDifficult;
use App\Models\Movement;
use App\Models\Sudoku;
use App\Services\SudokuGenerator;

class SudokuHelper
{
    public static function validateVictory(array $solutionGrid, array $currentGrid): bool
    {
        for ($row = 0; $row < 9; $row++) {
            for ($col = 0; $col < 9; $col++) {
                if ($currentGrid[$row][$col] !== $solutionGrid[$row][$col]) {
                    return false;
                }
            }
        }

        return true;
    }

    public static function getNumberMovement($gameId)
    {
        $movements = Movement::where('game_id', $gameId)->count();

        return $movements === 0 ? 1 : $movements + 1;
    }

    public static function getSudoku($difficult)
    {
        $difficult = SudokuDifficult::from($difficult);
        $numberSudokus = Sudoku::where('difficult', $difficult)->count();

        if ($numberSudokus < 50) {
            $generator = new SudokuGenerator;
            $board = $generator->generate();
            $sudokuWithRemovedNumbers = $generator->removeNumbers($difficult);

            return Sudoku::create([
                'solution' => $board,
                'grid' => $sudokuWithRemovedNumbers,
                'difficult' => $difficult->value,
            ]);
        } else {
            return Sudoku::where('difficult', $difficult)->inRandomOrder()->first();
        }

    }

    public static function searchHint(array $solutionGrid, array $currentGrid): array
    {
        $emptyCells = [];
        foreach ($currentGrid as $rowIndex => $row) {
            foreach ($row as $colIndex => $cell) {
                if ($cell === 0) {
                    $emptyCells[] = [$rowIndex, $colIndex];
                }
            }
        }

        $randomCell = $emptyCells[array_rand($emptyCells)];
        $row = $randomCell[0];
        $column = $randomCell[1];

        $hint = $solutionGrid[$row][$column];

        $currentGrid[$row][$column] = $hint;

        return [
            'row' => $row,
            'column' => $column,
            'hint' => $hint,
            'updatedGrid' => $currentGrid,
        ];
    }
}

