import { type FC, type KeyboardEvent, useState } from "react";

interface CellProps {
    id: string;
    row: number;
    column: number;
    value: number;
    isEmpty: boolean;
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
    isEmpty,
    cellMates,
    isActive,
    isHighlighted,
    highlightMates,
    setActiveCell,
    clearHighlights,
}) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (/[0-9]/.test(e.key)) {
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
        "flex justify-center items-center size-10 border border-zinc-400 relative text-center focus:outline-transparent focus:bg-purple-500 focus:text-white",
        (row === 3 || row === 6) && "border-b-4",
        (column === 3 || column === 6) && "border-r-4",
        isEmpty
            ? "text-blue-300 font-bold text-black"
            : `font-bold  ${isHighlighted ? "bg-purple-100" : "bg-zinc-100"} text-black`,
        isHighlighted && "bg-purple-100",
    ];

    return (
        <div
            className={classList.join(" ").trim()}
            onKeyDown={(e) => {
                if (isEmpty) {
                    handleKeyDown(e);
                }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={0}
        >
            <span className="">{currentValue === 0 ? "" : currentValue}</span>
        </div>
    );
};
