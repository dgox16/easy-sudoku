import axios from "./axios.ts";

export const generateSudokuRequest = async (difficult: string) => {
    const res = await axios.get(`/sudoku/generate?difficult=${difficult}`);
    return res.data;
};
