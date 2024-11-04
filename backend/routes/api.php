<?php

use App\Http\Controllers\SudokuController;
use Illuminate\Support\Facades\Route;

Route::controller(SudokuController::class)->group(function () {
    Route::get('/sudoku/new-game', 'newGameSudoku');
});

