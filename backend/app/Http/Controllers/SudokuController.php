<?php

namespace App\Http\Controllers;

use App\Enums\SudokuDifficult;
use App\Services\SudokuGenerator;
use Illuminate\Http\Request;

class SudokuController extends Controller
{
    public function generateSudoku(Request $request)
    {
        $generator = new SudokuGenerator();
        $board = $generator->generate();
        $sudokuWithRemovedNumbers = $generator->removeNumbers(SudokuDifficult::MEDIUM->value);

        return response()->json([
            'solution' => $board,
            'sudoku' => $sudokuWithRemovedNumbers
        ]);
    }
}
