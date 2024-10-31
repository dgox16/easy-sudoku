<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Services\SudokuGenerator;

Route::get('/sudoku/generate', function (Request $request) {

    $generator = new SudokuGenerator();
    $board = $generator->generate();
    $sudokuWithRemovedNumbers = $generator->removeNumbers(40);

    return response()->json([
        'solution' => $board,
        'sudoku' => $sudokuWithRemovedNumbers
    ]);
});
