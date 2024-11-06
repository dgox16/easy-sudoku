import type { CellType } from "./cellTypes";

export type GameMatrixType = {
    game: number;
    sudoku: number[][];
};

export type GameType = {
    game: number;
    sudoku: CellType[];
};
