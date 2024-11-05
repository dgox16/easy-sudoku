import type { CellType } from "../types/sudokuTypes.ts";

export const getCellMates = (
    grid: CellType[],
    { id, block, row, column }: CellType,
) => {
    return grid
        .filter(
            (cell) =>
                cell.id !== id &&
                (cell.row === row ||
                    cell.column === column ||
                    cell.block === block),
        )
        .map((cell) => cell.id);
};

export const getSameValueCell = (grid: CellType[], { id, value }: CellType) => {
    return grid
        .filter(
            (cell) =>
                cell.id !== id && cell.value !== 0 && cell.value === value,
        )
        .map((cell) => cell.id);
};
