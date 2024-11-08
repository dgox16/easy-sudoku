import type { FC } from "react";
import type React from "react";
import type { CellProps } from "../../types/cellTypes";

export const Cell: FC<CellProps> = ({
    cell,
    cellMates,
    sameValueCells,
    highlightMates,
    highlightSameValue,
    clearHighlights,
    updateCellValue,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const number = Number.parseInt(e.key, 10);

        if (number >= 0 && number <= 9) {
            updateCellValue(cell.row, cell.column, number);
        } else {
            e.preventDefault();
        }
    };

    const handleFocus = () => {
        highlightMates(cellMates);
        highlightSameValue(sameValueCells);
    };

    const handleBlur = () => {
        clearHighlights();
    };

    const classList = [
        "flex justify-center text-2xl items-center size-10 lg:size-12 border-[2px] border-polar-night-0 relative text-center focus:outline-transparent focus:bg-frost-3 focus:text-white outline-none",
        (cell.row === 2 || cell.row === 5) && "border-b-[6px]",
        (cell.column === 2 || cell.column === 5) && "border-r-[6px]",
        cell.isSameValue && "bg-frost-2 bg-opacity-50 text-snow-storm-2",
        cell.isHighlighted && "bg-frost-3 bg-opacity-20 text-snow-storm-2",
        cell.isEmpty ? "font-bold text-frost-1" : "font-bold text-snow-storm-2",
    ];

    return (
        <button
            aria-label={cell.id}
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
            <span>{cell.value === 0 ? "" : cell.value}</span>
        </button>
    );
};
