import type { CellType, SudokuType } from "../types/sudokuTypes.ts";

export const getCellMates = (
    grid: SudokuType,
    { id, block, row, column, value }: CellType,
) => {
    return grid
        .filter(
            (cell) =>
                cell.id !== id &&
                (cell.row === row ||
                    cell.column === column ||
                    cell.block === block ||
                    (cell.value !== 0 && cell.value === value)),
        )
        .map((cell) => cell.id);
};
