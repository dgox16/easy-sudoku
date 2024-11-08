import type { CellType } from "../types/cellTypes.ts";
import type { GameType } from "../types/sudokuTypes.ts";

export const updateGridValues = (
    currentGame: GameType,
    newGame: GameType,
): GameType => {
    const updatedGrid = currentGame.sudoku.map((cell, index) => {
        const newValue = newGame.sudoku[index].value;
        return {
            ...cell,
            value: newValue,
        };
    });

    return {
        ...currentGame,
        sudoku: updatedGrid,
    };
};

export const updateGridWithHint = (
    grid: CellType[],
    hint: { row: number; column: number; hint: number },
): CellType[] => {
    return grid.map((cell) => {
        if (cell.row === hint.row && cell.column === hint.column) {
            return {
                ...cell,
                value: hint.hint,
            };
        }
        return cell;
    });
};
