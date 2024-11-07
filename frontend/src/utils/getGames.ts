import type React from "react";
import { newGameRequest } from "../services/sudokuRequests.ts";
import type { GameType } from "../types/sudokuTypes.ts";
import { convertMatrixToGrid } from "./formatSudoku.ts";

export const fetchSudoku = async (
    setTimer: React.Dispatch<React.SetStateAction<number>>,
    setGame: React.Dispatch<React.SetStateAction<GameType>>,
    prevGameRef: React.MutableRefObject<GameType | null>,
) => {
    try {
        setTimer(0);
        const gameResponse = await newGameRequest("medium");
        const gameFormatted = convertMatrixToGrid(gameResponse);
        console.log(gameFormatted);
        setGame(gameFormatted);
        prevGameRef.current = gameFormatted;
    } catch (error) {
        console.error("Error fetching sudoku:", error);
    }
};
