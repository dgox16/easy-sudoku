<?php

use App\Http\Controllers\SudokuController;
use Illuminate\Support\Facades\Route;

Route::controller(SudokuController::class)->group(function () {
    Route::get('/sudoku/new-game', 'newGameSudoku');
    Route::post('/sudoku/new-movement', 'newMovement');
    Route::get('/sudoku/backward', 'backwardMove');
    Route::get('/sudoku/get-hint', 'getHint');
});

