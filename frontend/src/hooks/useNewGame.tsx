import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ErrorIcon } from "../components/icons/ErrorIcon.tsx";
import {
    backwardRequest,
    newMovementRequest,
} from "../services/sudokuRequests.ts";
import type { GameType } from "../types/sudokuTypes.ts";
import {
    convertGridToMatrix,
    convertMatrixToGrid,
    formatTime,
} from "../utils/formatSudoku.ts";
import { fetchSudoku } from "../utils/getGames.ts";

export const useNewGame = () => {
    const [game, setGame] = useState<GameType>({ game: 0, sudoku: [] });
    const [victory, setVictory] = useState(false);
    const [timer, setTimer] = useState(0);
    const prevGameRef = useRef<GameType | null>(null);
    const debounceTimeout = useRef<ReturnType<typeof setInterval> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        fetchSudoku(setTimer, setGame, prevGameRef);
    }, []);

    const anotherGame = () => {
        setVictory(false);
        fetchSudoku(setTimer, setGame, prevGameRef);
    };

    const updateCellValue = async (id: string, newValue: number) => {
        const cell = game.sudoku.find((cell) => cell.id === id);

        if (cell && cell.value === newValue) {
            return;
        }

        const updatedGame = game.sudoku.map((cell) =>
            cell.id === id ? { ...cell, value: newValue } : cell,
        );

        setGame((prevGame) => ({
            game: prevGame.game,
            sudoku: updatedGame,
        }));

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            const gameMatrix = convertGridToMatrix({
                ...game,
                sudoku: updatedGame,
            });

            const movement = {
                game_id: gameMatrix.game,
                timer: timer,
                current_grid: gameMatrix.sudoku,
            };

            const res = await newMovementRequest(movement);
            if (res.is_winning_movement) {
                setVictory(true);
            }
        }, 300);
    };

    const updateGridValues = (
        currentGame: GameType,
        newGame: GameType,
    ): GameType => {
        const updatedGrid = currentGame.sudoku.map((cell, index) => {
            const newValue = newGame.sudoku[index].value;
            return {
                ...cell,
                value: newValue,
            };
        });

        return {
            ...currentGame,
            sudoku: updatedGrid,
        };
    };

    const backwardMove = async (game_id: number) => {
        try {
            const res = await backwardRequest(game_id);
            const gameFormatted = convertMatrixToGrid(res);

            const updatedGame = updateGridValues(game, gameFormatted);
            setGame(updatedGame);
        } catch (e) {
            toast.error("You can't go back any further", {
                icon: <ErrorIcon />,
            });
        }
    };

    const highlightMates = (cellMates: string[]) => {
        setGame((prevGame) => {
            return {
                game: prevGame.game,
                sudoku: prevGame.sudoku.map((cell) => ({
                    ...cell,
                    isHighlighted: cellMates.includes(cell.id),
                })),
            };
        });
    };

    const highlightSameValue = (cellMates: string[]) => {
        setGame((prevGame) => {
            return {
                game: prevGame.game,
                sudoku: prevGame.sudoku.map((cell) => ({
                    ...cell,
                    isSameValue: cellMates.includes(cell.id),
                })),
            };
        });
    };

    const clearHighlights = () => {
        setGame((prevGame) => {
            return {
                game: prevGame.game,
                sudoku: prevGame.sudoku.map((cell) => ({
                    ...cell,
                    isHighlighted: false,
                    isSameValue: false,
                })),
            };
        });
    };

    const formattedTime = formatTime(timer);

    return {
        game,
        updateCellValue,
        anotherGame,
        backwardMove,
        highlightMates,
        highlightSameValue,
        clearHighlights,
        victory,
        formattedTime,
    };
};
