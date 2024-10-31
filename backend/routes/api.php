<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Services\SudokuGenerator;
use App\Enums\SudokuDifficult;

Route::get('/sudoku/generate', function (Request $request) {
    $generator = new SudokuGenerator();
    $board = $generator->generate();
    $sudokuWithRemovedNumbers = $generator->removeNumbers(SudokuDifficult::MEDIUM->value);

    return response()->json([
        'solution' => $board,
        'sudoku' => $sudokuWithRemovedNumbers
    ]);
});
