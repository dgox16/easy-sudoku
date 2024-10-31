<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function (Request $request) {
    $failedResults = [];

    for ($i = 0; $i < 1000; $i++) {
        $generator = new \App\Services\SudokuGenerator();
        $board = $generator->generate();

        $sudokuWithRemovedNumbers = $generator->removeNumbers(40);

        $validator = new \App\Services\SudokuValidator($sudokuWithRemovedNumbers);
        $isValid = $validator->isValid();

        if (!$isValid) {
            $failedResults[] = [
                'original_board' => $board,
                'puzzle_board' => $sudokuWithRemovedNumbers
            ];
        }
    }

    return response()->json([
        'failed_count' => count($failedResults),
        'failed_results' => $failedResults
    ]);
});
