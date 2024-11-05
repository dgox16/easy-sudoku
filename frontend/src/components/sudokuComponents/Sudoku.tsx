import { useNewGame } from "../../hooks/useNewGame.tsx";
import { getCellMates, getSameValueCell } from "../../libs/getCellMates";
import { Cell } from "./Cell";

export const Sudoku = () => {
    const {
        grid,
        updateCellValue,
        highlightMates,
        highlightSameValue,
        clearHighlights,
        formattedTime,
    } = useNewGame();

    return (
        <div className="flex flex-col justify-center items-center bg-polar-night-0">
            <p className="text-snow-storm-2 font-medium text-xl mb-3">
                {formattedTime}
            </p>
            <div className="grid grid-cols-9 p-4 rounded-xl bg-polar-night-1">
                {grid.map((cell) => (
                    <Cell
                        cell={cell}
                        key={cell.id}
                        updateCellValue={updateCellValue}
                        highlightMates={highlightMates}
                        highlightSameValue={highlightSameValue}
                        clearHighlights={clearHighlights}
                        cellMates={getCellMates(grid, cell)}
                        sameValueCells={getSameValueCell(grid, cell)}
                    />
                ))}
            </div>
        </div>
    );
};
