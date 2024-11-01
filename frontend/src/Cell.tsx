import type { FC } from "react";
import type React from "react";
import type { CellType } from "./types/sudokuTypes.ts";

interface CellProps {
    cell: CellType;
    cellMates: string[];
    highlightMates: (mates: string[]) => void;
    clearHighlights: () => void;
    updateCellValue: (id: string, newValue: number) => void;
}

export const Cell: FC<CellProps> = ({
    cell,
    cellMates,
    highlightMates,
    clearHighlights,
    updateCellValue,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (/[0-9]/.test(e.key)) {
            updateCellValue(cell.id, Number(e.key));
        }
    };

    const handleFocus = () => {
        highlightMates(cellMates);
    };

    const handleBlur = () => {
        clearHighlights();
    };

    const classList = [
        "flex justify-center text-xl items-center size-10 border-2 border-polar-night-0 relative text-center focus:outline-transparent focus:bg-frost-3 focus:text-white",

        // cell.row === 1 && "border-t-0",
        // cell.column === 1 && "border-l-0",
        (cell.row === 3 || cell.row === 6) && "border-b-4",
        (cell.column === 3 || cell.column === 6) && "border-r-4",
        cell.isHighlighted && "bg-frost-3 bg-opacity-50 text-snow-storm-2",
        cell.isEmpty
            ? "font-medium text-frost-1"
            : `font-bold text-snow-storm-2  ${!cell.isHighlighted ? "" : "bg-frost-3"}`,
    ];

    return (
        <button
            type={"button"}
            className={classList.join(" ").trim()}
            onKeyDown={(e) => {
                if (cell.isEmpty) {
                    handleKeyDown(e);
                }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <span className="">{cell.value === 0 ? "" : cell.value}</span>
        </button>
    );
};
