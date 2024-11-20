import type { CellType } from "./cellTypes";

export type GameMatrixType = {
    game: number;
    difficult: string;
    sudoku: number[][];
};

export type GameType = {
    game: number;
    difficult: string;
    sudoku: CellType[];
};

export interface NewMovementRequest {
    game: number;
    row: number;
    column: number;
    value: number;
    timer: number;
}

export interface HintType {
    row: number;
    column: number;
    hint: number;
    isWinningMovement: boolean;
}
