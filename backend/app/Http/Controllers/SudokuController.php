<?php

namespace App\Http\Controllers;

use App\Enums\SudokuDifficult;
use App\Http\Requests\GenerateSudokuRequest;
use App\Models\GuestGame;
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

        $newSudoku = Sudoku::create([
            'solution' => json_encode($board),
            'grid' => json_encode($sudokuWithRemovedNumbers),
            'difficult' => $difficult->value,
        ]);

        $guestGame =  GuestGame::create(['sudoku_id' => $newSudoku->id]);

        return response()->json([
            'game' => $guestGame->id,
            'finished' => $guestGame->finished,
            'sudoku' => [
                'grid' => $newSudoku->grid,
                'difficult' => $newSudoku->difficult,
            ]
        ]);
    }
}
