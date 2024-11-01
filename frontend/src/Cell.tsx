import { useState, type FC, type KeyboardEvent } from "react";

interface CellProps {
    id: string;
    row: number;
    column: number;
    value: number;
    cellMates: string[];
    isActive: boolean;
    isHighlighted: boolean;
    highlightMates: (mates: string[]) => void;
    setActiveCell: (id: string) => void;
    clearHighlights: () => void;
}

export const Cell: FC<CellProps> = ({
    id,
    row,
    column,
    value,
    cellMates,
    isActive,
    isHighlighted,
    highlightMates,
    setActiveCell,
    clearHighlights,
}) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (/[1-9]/.test(e.key)) {
            setCurrentValue(Number(e.key));
        }
    };

    const handleFocus = () => {
        highlightMates(cellMates);
        setActiveCell(id);
    };

    const handleBlur = () => {
        clearHighlights();
    };
    const classList = [
        "flex justify-center items-center size-10 border border-blue-300 border-opacity-60 relative text-center focus:outline-transparent focus:bg-blue-200",
        row === 3 || row === 6 ? "border-b-4" : "",
        column === 3 || column === 6 ? "border-r-4" : "",
        isHighlighted && "highlight",
        isActive && "is-active",
    ];

    return (
        <div
            className={classList.join(" ").trim()}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={0}
        >
            <span className="">{currentValue === 0 ? "" : currentValue}</span>
        </div>
    );
};
