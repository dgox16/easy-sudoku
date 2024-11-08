import type { CellType } from "../types/cellTypes.ts";
import type { GameMatrixType, GameType } from "../types/sudokuTypes.ts";

const getCellBlock = (row: number, column: number) => {
    return Math.floor(row / 3) * 3 + Math.floor(column / 3) + 1;
};

export const convertMatrixToGrid = (sudoku: GameMatrixType): GameType => {
    const grid: CellType[] = sudoku.sudoku.flatMap((row, rowIndex) => {
        return row.map((value: number, columnIndex: number) => ({
            id: String.fromCharCode(97 + rowIndex) + columnIndex,
            column: columnIndex,
            row: rowIndex,
            block: getCellBlock(rowIndex, columnIndex),
            value: value,
            initialValue: value,
            isEmpty: value === 0,
            isHighlighted: false,
            isSameValue: false,
        }));
    });
    return {
        game: sudoku.game,
        sudoku: grid,
    };
};

export const convertGridToMatrix = (game: GameType): GameMatrixType => {
    const array: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

    for (const cell of game.sudoku) {
        array[cell.row][cell.column] = cell.value;
    }

    return { game: game.game, sudoku: array };
};

export const formatTime = (timer: number): string => {
    return (
        `${String(Math.floor(timer / 3600)).padStart(2, "0")}:` +
        `${String(Math.floor((timer % 3600) / 60)).padStart(2, "0")}:` +
        `${String(timer % 60).padStart(2, "0")}`
    );
};
