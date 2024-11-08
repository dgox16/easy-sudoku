import type { CellType } from "../types/cellTypes.ts";

export const updateAllGrid = (
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

export const updateGridWithRowColumn = (
    grid: CellType[],
    row: number,
    column: number,
    value: number,
): CellType[] => {
    return grid.map((cell) => {
        if (cell.row === row && cell.column === column) {
            return {
                ...cell,
                value: value,
            };
        }
        return cell;
    });
};
