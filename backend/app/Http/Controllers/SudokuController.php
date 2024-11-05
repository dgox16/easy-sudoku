<?php

namespace App\Http\Controllers;

use App\Enums\SudokuDifficult;
use App\Http\Requests\NewGameRequest;
use App\Http\Requests\newMovementRequest;
use App\Models\Game;
use App\Models\Movement;
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
            'sudoku' => $newSudoku->grid,
        ]);
    }

    function validateCurrentGrid(array $originalGrid, array $currentGrid): bool
    {
        for ($row = 0; $row < 9; $row++) {
            for ($col = 0; $col < 9; $col++) {
                if ($originalGrid[$row][$col] !== 0) {
                    if ($currentGrid[$row][$col] !== $originalGrid[$row][$col]) {
                        return false; // Si no coincide, retorna false
                    }
                }
            }
        }
        return true;
    }

    function validateVictory(array $solutionGrid, array $currentGrid): bool
    {
        for ($row = 0; $row < 9; $row++) {
            for ($col = 0; $col < 9; $col++) {
                if ($currentGrid[$row][$col] !== $solutionGrid[$row][$col]) {
                    return false;
                }
            }
        }
        return true;
    }

    function getNumberMovement($gameId)
    {
        $movements = Movement::where('game_id', $gameId)->count();

        return $movements === 0 ? 1 : $movements + 1;
    }

    public function newMovement(newMovementRequest $request): JsonResponse
    {
        $game = Game::find($request->game_id);
        $isGood = $this->validateCurrentGrid($game->sudoku->grid, $request->current_grid);
        if ($isGood) {
            $finished = $this->validateVictory(
                $game->sudoku->solution, $request->current_grid
            );
            $game->timer_seconds = $request->timer;
            $game->finished = $finished;
            $game->save();
            $newMovement = Movement::create([
                'game_id' => $request->game_id,
                'current_grid' => $request->current_grid,
                'number_movement' => $this->getNumberMovement($request->game_id),
                'is_winning_movement' => $finished,
                'is_backward' => false,
            ]);
            return response()->json($newMovement);
        }

        return response()->json([
            'error' => "error"
        ]);
    }
}
