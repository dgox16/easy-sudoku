import { useNewGame } from "../../hooks/useNewGame.tsx";
import { getCellMates, getSameValueCell } from "../../libs/getCellMates";
import { Cell } from "./Cell";

export const Sudoku = () => {
    const {
        game,
        updateCellValue,
        backwardMove,
        highlightMates,
        highlightSameValue,
        clearHighlights,
        formattedTime,
    } = useNewGame();

    return (
        <div className="flex flex-col justify-center items-center bg-polar-night-0">
            <p className="text-snow-storm-2 font-medium text-2xl mb-3">
                {formattedTime}
            </p>
            <div className="grid grid-cols-9 p-4 rounded-xl bg-polar-night-1">
                {game.sudoku.map((cell) => (
                    <Cell
                        cell={cell}
                        key={cell.id}
                        updateCellValue={updateCellValue}
                        highlightMates={highlightMates}
                        highlightSameValue={highlightSameValue}
                        clearHighlights={clearHighlights}
                        cellMates={getCellMates(game.sudoku, cell)}
                        sameValueCells={getSameValueCell(game.sudoku, cell)}
                    />
                ))}
            </div>
            <div className="grid grid-cols-2 w-[350px] gap-x-7 mt-3">
                <button
                    type="button"
                    className="bg-aurora-yellow rounded-xl w-full py-2 text-polar-night-0 font-medium text-lg hover:scale-105 transition"
                >
                    Hint
                </button>

                <button
                    type="button"
                    className="bg-aurora-green rounded-xl w-full py-2 text-polar-night-0 font-medium text-lg hover:scale-105 transition"
                    onClick={async () => {
                        await backwardMove(game.game);
                    }}
                >
                    Backward
                </button>
            </div>
        </div>
    );
};
