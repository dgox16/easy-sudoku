<?php

namespace App\Http\Controllers;

use App\Enums\SudokuDifficult;
use App\Http\Requests\NewGameRequest;
use App\Http\Requests\newMovementRequest;
use App\Models\Game;
use App\Models\Sudoku;
use App\Services\SudokuGenerator;
use Illuminate\Http\JsonResponse;

class SudokuController extends Controller
{
    public function newGameSudoku(NewGameRequest $request): JsonResponse
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

        $game = Game::create(['sudoku_id' => $newSudoku->id]);

        return response()->json([
            'game' => $game->id,
            'finished' => $game->finished,
            'sudoku' => [
                'grid' => json_decode($newSudoku->grid, true),
                'difficult' => $newSudoku->difficult,
            ]
        ]);
    }

    public function newMovement(newMovementRequest $request): JsonResponse
    {
        $sudoku = Game::find($request->game_id)->sudoku;
        return response()->json($sudoku);
    }
}
