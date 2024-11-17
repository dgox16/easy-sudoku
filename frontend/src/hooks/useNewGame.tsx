import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ErrorIcon } from "../components/icons/ErrorIcon.tsx";
import {
    backwardRequest,
    getHintRequest,
    newMovementRequest,
} from "../services/sudokuRequests.ts";
import { useGameStore } from "../store/useGameStore.ts";
import type { GameType } from "../types/sudokuTypes.ts";
import { convertMatrixToGrid, formatTime } from "../utils/formatSudoku.ts";
import { fetchSudoku } from "../utils/getGames.ts";
import { updateAllGrid, updateGridWithRowColumn } from "../utils/updateGame.ts";

export const useNewGame = () => {
    const { game, setGame, setTimer, timer, incTimer } = useGameStore();
    const [victory, setVictory] = useState(false);
    const prevGameRef = useRef<GameType | null>(null);
    const debounceTimeout = useRef<ReturnType<typeof setInterval> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            incTimer();
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        fetchSudoku(setTimer, setGame, prevGameRef).catch((error) => {
            toast.error(`Error loading the game: ${error.message}`, {
                icon: <ErrorIcon />,
            });
        });
    }, []);

    const anotherGame = async () => {
        setVictory(false);
        try {
            await fetchSudoku(setTimer, setGame, prevGameRef);
        } catch (error) {
            toast.error("Error starting a new game", {
                icon: <ErrorIcon />,
            });
        }
    };

    const updateCellValue = async (
        row: number,
        column: number,
        newValue: number,
    ) => {
        const cell = game.sudoku.find(
            (cell) => cell.row === row && cell.column === column,
        );

        if (cell && cell.value === newValue) {
            return;
        }

        const updatedGame = updateGridWithRowColumn(
            game.sudoku,
            row,
            column,
            newValue,
        );

        setGame({
            game: game.game,
            sudoku: updatedGame,
        });

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            const movement = {
                game: game.game,
                timer: timer,
                row: row,
                column: column,
                value: newValue,
            };

            const res = await newMovementRequest(movement);
            if (res.isWinningMovement) {
                setVictory(true);
            }
        }, 300);
    };

    const backwardMove = async (game_id: number) => {
        try {
            const res = await backwardRequest(game_id);
            const gameFormatted = convertMatrixToGrid(res);

            const updatedGame = updateAllGrid(
                game.sudoku,
                gameFormatted.sudoku,
            );
            setGame({
                game: game.game,
                sudoku: updatedGame,
            });
        } catch (e) {
            toast.error("You can't go back any further", {
                icon: <ErrorIcon />,
            });
        }
    };

    const getHint = async (game_id: number) => {
        const res = await getHintRequest(game_id, timer);
        const updatedGrid = updateGridWithRowColumn(
            game.sudoku,
            res.row,
            res.column,
            res.hint,
        );

        setGame({
            game: game.game,
            sudoku: updatedGrid,
        });

        if (res.isWinningMovement) {
            setVictory(true);
        }
    };

    const highlightMates = (cellMates: string[], sameValueCell: string[]) => {
        setGame({
            game: game.game,
            sudoku: game.sudoku.map((cell) => ({
                ...cell,
                isHighlighted: cellMates.includes(cell.id),
                isSameValue: sameValueCell.includes(cell.id),
            })),
        });
    };

    const clearHighlights = () => {
        setGame({
            game: game.game,
            sudoku: game.sudoku.map((cell) => ({
                ...cell,
                isHighlighted: false,
                isSameValue: false,
            })),
        });
    };

    return {
        updateCellValue,
        anotherGame,
        backwardMove,
        getHint,
        highlightMates,
        clearHighlights,
        victory,
        formattedTime: formatTime(timer),
    };
};
