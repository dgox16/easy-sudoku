import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
    convertGridToMatrix,
    convertMatrixToGrid,
} from "../libs/formatSudoku.ts";
import {
    backwardRequest,
    newGameRequest,
    newMovementRequest,
} from "../services/sudokuRequests.ts";
import type { GameType } from "../types/sudokuTypes.ts";

export const useNewGame = () => {
    const [game, setGame] = useState<GameType>({ game: 0, sudoku: [] });
    const [timer, setTimer] = useState(0);
    const prevGameRef = useRef<GameType | null>(null);
    const debounceTimeout = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const fetchSudoku = async () => {
            try {
                const gameResponse = await newGameRequest("hard");
                const gameFormatted = convertMatrixToGrid(gameResponse);
                setGame(gameFormatted);
                prevGameRef.current = gameFormatted;

                const interval = setInterval(() => {
                    setTimer((prevTimer) => prevTimer + 1);
                }, 1000);

                return () => clearInterval(interval);
            } catch (error) {
                console.error("Error fetching sudoku:", error);
            }
        };
        fetchSudoku();
    }, []);

    const formattedTime =
        `${String(Math.floor(timer / 3600)).padStart(2, "0")}:` +
        `${String(Math.floor((timer % 3600) / 60)).padStart(2, "0")}:` +
        `${String(timer % 60).padStart(2, "0")}`;

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

            await newMovementRequest(movement);
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
                value: newValue, // Solo actualizamos la propiedad 'value'
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
                icon: (
                    <svg
                        fill="#BF616A"
                        viewBox="0 0 1920 1920"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-aurora-red size-5 mr-4"
                    >
                        <title>Error</title>
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M213.333 960c0-167.36 56-321.707 149.44-446.4L1406.4 1557.227c-124.693 93.44-279.04 149.44-446.4 149.44-411.627 0-746.667-335.04-746.667-746.667m1493.334 0c0 167.36-56 321.707-149.44 446.4L513.6 362.773c124.693-93.44 279.04-149.44 446.4-149.44 411.627 0 746.667 335.04 746.667 746.667M960 0C429.76 0 0 429.76 0 960s429.76 960 960 960 960-429.76 960-960S1490.24 0 960 0"
                                fillRule="evenodd"
                            />
                        </g>
                    </svg>
                ),
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

    return {
        game,
        updateCellValue,
        backwardMove,
        highlightMates,
        highlightSameValue,
        clearHighlights,
        formattedTime,
    };
};
