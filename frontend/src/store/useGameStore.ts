import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameType } from "../types/sudokuTypes.ts";

interface GameState {
    game: GameType;
    timer: number;
    createdAt: number;
    setGame: (newGame: GameType) => void;
    setTimer: (time: number) => void;
    incTimer: () => void;
    isGameExpired: () => boolean;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            game: {
                game: 0,
                sudoku: [],
            },
            timer: 0,
            createdAt: Date.now(),
            setGame: (newGame: GameType) => {
                set({ game: newGame, createdAt: Date.now() });
            },
            setTimer: (time: number) => {
                set({ timer: time });
            },
            incTimer: () => {
                set((state) => ({ timer: state.timer + 1 }));
            },
            isGameExpired: () => {
                const { createdAt } = get();
                return Date.now() - createdAt > 300000;
            },
        }),
        {
            name: "current_game",
        },
    ),
);
