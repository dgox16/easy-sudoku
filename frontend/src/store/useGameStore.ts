import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameType } from "../types/sudokuTypes.ts";

interface GameState {
    game: GameType;
    setGame: (newGame: GameType) => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            game: {
                game: 0,
                sudoku: [],
            },
            setGame: (newGame: GameType) => {
                console.log(newGame);
                set({ game: newGame });
            },
        }),
        {
            name: "current_game",
        },
    ),
);
