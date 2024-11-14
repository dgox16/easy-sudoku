import Confetti from "react-confetti-boom";
import { useNewGame } from "../../hooks/useNewGame.tsx";
import { useGameStore } from "../../store/useGameStore.ts";
import {
    getCellMates,
    getSameValueCell,
} from "../../utils/getCellHighlight.ts";
import { Cell } from "./Cell";

export const Sudoku = () => {
    const { game } = useGameStore();
    const {
        updateCellValue,
        anotherGame,
        backwardMove,
        getHint,
        highlightMates,
        clearHighlights,
        formattedTime,
        victory,
    } = useNewGame();

    return (
        <div className="flex flex-col justify-center items-center bg-polar-night-0">
            {victory ? (
                <p className="text-aurora-yellow font-medium text-2xl mb-3">
                    You have won!
                </p>
            ) : (
                <p className="text-snow-storm-2 font-medium text-2xl mb-3">
                    {formattedTime}
                </p>
            )}
            <div className="grid grid-cols-9 p-3 lg:p-4 rounded-xl bg-polar-night-1">
                {game.sudoku.map((cell) => (
                    <Cell
                        cell={cell}
                        key={cell.id}
                        updateCellValue={updateCellValue}
                        highlightMates={highlightMates}
                        clearHighlights={clearHighlights}
                        cellMates={getCellMates(game.sudoku, cell)}
                        sameValueCells={getSameValueCell(game.sudoku, cell)}
                    />
                ))}
            </div>

            {victory ? (
                <div className="grid grid-cols-1 w-[350px] gap-x-7 mt-3">
                    <button
                        type="button"
                        className="bg-aurora-green rounded-xl w-full py-2 text-polar-night-0 font-medium text-lg hover:scale-105 transition"
                        onClick={() => anotherGame()}
                    >
                        Want to play again?
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 w-[350px] gap-x-7 mt-3">
                    <button
                        type="button"
                        className="bg-frost-0 rounded-xl w-full py-2 text-polar-night-0 font-medium text-lg hover:scale-105 transition"
                        onClick={async () => {
                            await getHint(game.game);
                        }}
                    >
                        Hint
                    </button>
                    <button
                        type="button"
                        className="bg-aurora-purple rounded-xl w-full py-2 text-polar-night-0 font-medium text-lg hover:scale-105 transition"
                        onClick={async () => {
                            await backwardMove(game.game);
                        }}
                    >
                        Backward
                    </button>
                </div>
            )}
            {victory && (
                <Confetti
                    mode="fall"
                    particleCount={100}
                    colors={[
                        "#EBCB8B",
                        "#A3BE8C",
                        "#BF616A",
                        "#B48EAD",
                        "#88C0D0",
                        "#D08770",
                    ]}
                />
            )}
        </div>
    );
};
