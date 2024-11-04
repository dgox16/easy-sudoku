import axios from "./axios.ts";

export const newGameRequest = async (difficult: string) => {
    const res = await axios.get(`/sudoku/new-game?difficult=${difficult}`);
    return res.data;
};
