<?php

namespace App\Http\Controllers;

use App\Enums\SudokuDifficult;
use App\Helpers\SudokuHelper;
use App\Http\Requests\backwardRequest;
use App\Http\Requests\hintRequest;
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

        $generator = new SudokuGenerator;
        $board = $generator->generate();
        $sudokuWithRemovedNumbers = $generator->removeNumbers($difficult);

        $newSudoku = Sudoku::create([
            'solution' => $board,
            'grid' => $sudokuWithRemovedNumbers,
            'difficult' => $difficult->value,
        ]);

        $game = Game::create(['sudoku_id' => $newSudoku->id]);

        Movement::create([
            'game_id' => $game->id,
            'current_grid' => $sudokuWithRemovedNumbers,
            'number_movement' => 1,
            'is_winning_movement' => false,
            'is_hint' => false
        ]);

        return response()->json([
            'game' => $game->id,
            'difficult' => $newSudoku->difficult,
            'sudoku' => $newSudoku->grid,
        ]);
    }


    public function newMovement(newMovementRequest $request): JsonResponse
    {
        $lastGrid = Movement::where('game_id', $request->game)
            ->orderBy('number_movement', 'desc')
            ->first()
            ->current_grid;


        $lastGrid[$request->row][$request->column] = $request->value;

        $game = Game::find($request->game);
        $finished = SudokuHelper::validateVictory(
            $game->sudoku->solution, $lastGrid
        );
        $game->timer_seconds = $request->timer;
        $game->finished = $finished;
        $game->save();
        Movement::create([
            'game_id' => $request->game,
            'current_grid' => $lastGrid,
            'number_movement' => SudokuHelper::getNumberMovement($request->game),
            'is_winning_movement' => $finished,
            'is_hint' => false
        ]);

        return response()->json(
            [
                'isWinningMovement' => $finished,
            ]
        );
    }

    public function backwardMove(backwardRequest $request): JsonResponse
    {
        $lastMove = Movement::where('game_id', $request->game)
            ->orderBy('number_movement', 'desc')
            ->first();

        if (!$lastMove || $lastMove->number_movement == 1) {
            return response()->json(['message' => 'No hay movimientos para deshacer.'], 400);
        }

        $previousMove = Movement::where('game_id', $request->game)
            ->where('number_movement', $lastMove->number_movement - 1)
            ->first();

        $lastMove->delete();

        return response()->json([
            'game' => $previousMove->game_id,
            'sudoku' => $previousMove->current_grid,
        ]);
    }


    public function getHint(hintRequest $request): JsonResponse
    {
        $lastMove = Movement::where('game_id', $request->game)->orderBy('number_movement', 'desc')->first();
        $currentGrid = $lastMove->current_grid;
        $game = $lastMove->game;

        $hint = SudokuHelper::searchHint($game->sudoku->solution, $currentGrid);

        $finished = SudokuHelper::validateVictory(
            $game->sudoku->solution, $hint['updatedGrid']
        );

        $game->timer_seconds = $request->timer;
        $game->finished = $finished;
        $game->save();

        Movement::create([
            'game_id' => $request->game,
            'current_grid' => $hint['updatedGrid'],
            'number_movement' => SudokuHelper::getNumberMovement($request->game),
            'is_winning_movement' => $finished,
            'is_hint' => true
        ]);

        return response()->json([
            'row' => $hint['row'],
            'column' => $hint['column'],
            'hint' => $hint['hint'],
            'isWinningMovement' => $finished,
        ]);
    }
}
