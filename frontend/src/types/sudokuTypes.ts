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

export interface CellProps {
    cell: CellType;
    cellMates: string[];
    sameValueCells: string[];
    highlightMates: (mates: string[]) => void;
    highlightSameValue: (mates: string[]) => void;
    clearHighlights: () => void;
    updateCellValue: (id: string, newValue: number) => void;
}
