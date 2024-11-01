const getCellBlock = (row: number, column: number) => {
    return Math.floor((row - 1) / 3) * 3 + Math.floor((column - 1) / 3) + 1;
};

export const createGridFromArray = (array: number[][]) => {
    return array.flatMap((row, rowIndex) => {
        return row.map((value: number, columnIndex: number) => ({
            id: String.fromCharCode(97 + rowIndex) + (columnIndex + 1), // 'a' es 97 en ASCII
            column: columnIndex + 1,
            row: rowIndex + 1,
            block: getCellBlock(rowIndex + 1, columnIndex + 1),
            value: value,
            isEmpty: value === 0,
            isHighlighted: false,
        }));
    });
};
