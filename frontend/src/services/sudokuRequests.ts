import type {
    GameMatrixType,
    NewMovementRequest,
} from "../types/sudokuTypes.ts";
import axios from "./axios.ts";

export const newGameRequest = async (
    difficult: string,
): Promise<GameMatrixType> => {
    const res = await axios.get(`/sudoku/new-game?difficult=${difficult}`);
    return res.data;
};

export const newMovementRequest = async (movement: NewMovementRequest) => {
    const res = await axios.post("sudoku/new-movement", movement);
    return res.data;
};

export const backwardRequest = async (
    game: number,
): Promise<GameMatrixType> => {
    const res = await axios.get(`sudoku/backward?game=${game}`);
    return res.data;
};

export const getHintRequest = async (game: number) => {
    const res = await axios.get(`sudoku/get-hint?game=${game}`);
    return res.data;
};
