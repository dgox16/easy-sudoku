<?php

namespace App\Http\Controllers;

use App\Enums\SudokuDifficult;
use App\Http\Requests\GenerateSudokuRequest;
use App\Services\SudokuGenerator;
use Illuminate\Http\Request;

class SudokuController extends Controller
{
    public function generateSudoku(GenerateSudokuRequest $request)
    {
        $generator = new SudokuGenerator();
        $board = $generator->generate();

        $difficult = SudokuDifficult::from($request->difficult);
        $sudokuWithRemovedNumbers = $generator->removeNumbers($difficult);

        return response()->json([
            'solution' => $board,
            'sudoku' => $sudokuWithRemovedNumbers
        ]);
    }
}
