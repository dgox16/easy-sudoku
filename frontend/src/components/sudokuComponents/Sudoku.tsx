import { useNewGame } from "../../hooks/useNewGame.tsx";
import { getCellMates } from "../../libs/getCellMates";
import { Cell } from "./Cell";

export const Sudoku = () => {
    const {
        grid,
        updateCellValue,
        highlightMates,
        clearHighlights,
        formattedTime,
    } = useNewGame();

    return (
        <div className="flex flex-col justify-center items-center bg-polar-night-0">
            <p className="text-snow-storm-2 font-medium text-2xl mb-3">
                {formattedTime}
            </p>
            <div className="grid grid-cols-9 p-4 rounded-xl bg-polar-night-1">
                {grid.map((cell) => (
                    <Cell
                        cell={cell}
                        key={cell.id}
                        updateCellValue={updateCellValue}
                        highlightMates={highlightMates}
                        clearHighlights={clearHighlights}
                        cellMates={getCellMates(grid, cell)}
                    />
                ))}
            </div>
        </div>
    );
};
