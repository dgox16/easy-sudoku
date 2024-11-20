import { newGameRequest } from "../services/sudokuRequests.ts";
import type { GameType } from "../types/sudokuTypes.ts";
import { convertMatrixToGrid } from "./formatSudoku.ts";
import { useGameStore } from "../store/useGameStore.ts";

export const fetchSudoku = async (
    setTimer: (time: number) => void,
    setGame: (newGame: GameType) => void,
    prevGameRef: React.MutableRefObject<GameType | null>,
    difficult: string = "medium"
) => {
    const { game, isGameExpired } = useGameStore.getState();

    if (!isGameExpired() && game.sudoku.length > 0) {
        prevGameRef.current = game;
        setGame(game);
        return;
    }

    try {
        setTimer(0);
        const gameResponse = await newGameRequest(difficult);
        const gameFormatted = convertMatrixToGrid(gameResponse);
        setGame(gameFormatted);
        prevGameRef.current = gameFormatted;
    } catch (error) {
        console.error("Error fetching sudoku:", error);
    }
};
