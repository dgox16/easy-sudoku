<?php

namespace App\Http\Controllers;

use App\Enums\SudokuDifficult;
use App\Http\Requests\GenerateSudokuRequest;
use App\Models\Sudoku;
use App\Services\SudokuGenerator;
use Illuminate\Http\JsonResponse;

class SudokuController extends Controller
{
    public function generateSudoku(GenerateSudokuRequest $request): JsonResponse
    {
        $difficult = SudokuDifficult::from($request->difficult);

        $generator = new SudokuGenerator();
        $board = $generator->generate();
        $sudokuWithRemovedNumbers = $generator->removeNumbers($difficult);

        $newSudoku = new Sudoku();
        $newSudoku->solution = json_encode($board);
        $newSudoku->grid = json_encode($sudokuWithRemovedNumbers);
        $newSudoku->difficult = $difficult;
        $newSudoku->save();

        return response()->json([
            'solution' => $board,
            'sudoku' => $sudokuWithRemovedNumbers
        ]);
    }
}
