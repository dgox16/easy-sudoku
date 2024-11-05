import type { GameMatrixType } from "../types/sudokuTypes.ts";
import axios from "./axios.ts";

export const newGameRequest = async (
    difficult: string,
): Promise<GameMatrixType> => {
    const res = await axios.get(`/sudoku/new-game?difficult=${difficult}`);
    return res.data;
};
