import type { GameMatrixType } from "../types/sudokuTypes.ts";
import axios from "./axios.ts";

export const newGameRequest = async (
    difficult: string,
): Promise<GameMatrixType> => {
    const res = await axios.get(`/sudoku/new-game?difficult=${difficult}`);
    return res.data;
};

export const newMovementRequest = async (movement) => {
    const res = await axios.post("sudoku/new-movement", movement);
    return res.data;
};
