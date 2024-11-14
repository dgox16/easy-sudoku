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

export interface CellProps {
    cell: CellType;
    cellMates: string[];
    sameValueCells: string[];
    highlightMates: (cellMates: string[], sameValueCells: string[]) => void;
    clearHighlights: () => void;
    updateCellValue: (row: number, col: number, newValue: number) => void;
}
