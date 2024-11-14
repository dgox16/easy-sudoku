import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameType } from "../types/sudokuTypes.ts";

interface GameState {
    game: GameType;
    timer: number;
    setGame: (newGame: GameType) => void;
    setTimer: (time: number) => void;
    incTimer: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            game: {
                game: 0,
                sudoku: [],
            },
            timer: 0,
            setGame: (newGame: GameType) => {
                set({ game: newGame });
            },
            setTimer: (time: number) => {
                set({ timer: time });
            },
            incTimer: () => {
                set((state) => ({ timer: state.timer + 1 }));
            },
        }),
        {
            name: "current_game",
        },
    ),
);
