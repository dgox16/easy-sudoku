import type { CellType } from "../types/cellTypes.ts";
import type { GameType } from "../types/sudokuTypes.ts";

export const updateGridValues = (
    currentGrid: CellType[],
    newGrid: CellType[],
): CellType[] => {
    return currentGrid.map((cell, index) => {
        const newValue = newGrid[index].value;
        return {
            ...cell,
            value: newValue,
        };
    });
};

export const updateGridWithId = (
    game: GameType,
    id: string,
    newValue: number,
) => {
    return game.sudoku.map((cell) =>
        cell.id === id ? { ...cell, value: newValue } : cell,
    );
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
