import { useState, type FC, type KeyboardEvent } from "react";

interface CellProps {
    id: string;
    row: number;
    column: number;
    value: number;
    cellMates: string[];
    isActive: boolean;
    isHighlighted: boolean;
    hasError: boolean;
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
    hasError,
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
        "cell", //
        `row-${row}`,
        `col-${column}`,
        isHighlighted && "highlight",
        hasError && "has-error",
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
            <span>{currentValue === 0 ? "" : currentValue}</span>
        </div>
    );
};
