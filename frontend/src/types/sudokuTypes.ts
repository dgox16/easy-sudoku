export interface CellType {
    block: number;
    column: number;
    id: string;
    isHighlighted: boolean;
    isSameValue: boolean;
    row: number;
    initialValue: number;
    isEmpty: boolean;
    value: number;
}

export type SudokuType = CellType[];
