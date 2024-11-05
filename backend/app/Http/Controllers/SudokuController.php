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
            'solution' => $board,
            'grid' => $sudokuWithRemovedNumbers,
            'difficult' => $difficult->value,
        ]);

        $game = Game::create(['sudoku_id' => $newSudoku->id]);

        return response()->json([
            'game' => $game->id,
            'finished' => $game->finished,
            'sudoku' => [
                'grid' => $newSudoku->grid,
                'difficult' => $newSudoku->difficult,
            ]
        ]);
    }

    public function newMovement(newMovementRequest $request): JsonResponse
    {
        $sudoku = Sudoku::find(2)->grid;
        var_dump(gettype($sudoku));
        return response()->json($sudoku);
    }
}
