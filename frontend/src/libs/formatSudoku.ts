import type { SudokuType } from "../types/sudokuTypes.ts";

const getCellBlock = (row: number, column: number) => {
    return Math.floor((row - 1) / 3) * 3 + Math.floor((column - 1) / 3) + 1;
};

export const convertArraytoGrid = (array: number[][]): SudokuType => {
    return array.flatMap((row, rowIndex) => {
        return row.map((value: number, columnIndex: number) => ({
            id: String.fromCharCode(97 + rowIndex) + (columnIndex + 1), // 'a' es 97 en ASCII
            column: columnIndex + 1,
            row: rowIndex + 1,
            block: getCellBlock(rowIndex + 1, columnIndex + 1),
            value: value,
            initialValue: value,
            isEmpty: value === 0,
            isHighlighted: false,
        }));
    });
};
export const convertGridToArray = (grid: SudokuType): number[][] => {
    const rows = Math.max(...grid.map((cell) => cell.row)); // Determinar la cantidad de filas
    const columns = Math.max(...grid.map((cell) => cell.column)); // Determinar la cantidad de columnas

    const array: number[][] = Array.from({ length: rows }, () =>
        Array(columns).fill(0),
    ); // Inicializar la matriz con ceros

    grid.forEach((cell) => {
        array[cell.row - 1][cell.column - 1] = cell.value;
    });

    return array;
};
