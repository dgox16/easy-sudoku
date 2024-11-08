import type { CellType } from "./cellTypes";

export type GameMatrixType = {
    game: number;
    sudoku: number[][];
};

export type GameType = {
    game: number;
    sudoku: CellType[];
};

export interface NewMovementRequest {
    game_id: number;
    timer: number;
    current_grid: number[][];
}

export interface HintType {
    row: number;
    column: number;
    hint: number;
    isWinningMovement: boolean;
}
