import { useEffect, useRef, useState } from "react";
import {
    convertArraytoGrid,
    convertGridToArray,
} from "../libs/formatSudoku.ts";
import { generateSudokuRequest } from "../services/sudokuRequests.ts";
import type { SudokuType } from "../types/sudokuTypes.ts";

export const useSudokuGrid = () => {
    const [grid, setGrid] = useState<SudokuType>([]);
    const [timer, setTimer] = useState(0);
    const prevGridRef = useRef<SudokuType | null>(null);

    useEffect(() => {
        const fetchSudoku = async () => {
            try {
                const sudoku = await generateSudokuRequest("hard");
                console.log(sudoku);
                const gridObjects = convertArraytoGrid(sudoku.sudoku.grid);
                setGrid(gridObjects);
                prevGridRef.current = gridObjects;

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

    const updateCellValue = (id: string, newValue: number) => {
        setGrid((prevGrid) =>
            prevGrid.map((cell) =>
                cell.id === id ? { ...cell, value: newValue } : cell,
            ),
        );
    };

    const highlightMates = (cellMates: string[]) => {
        setGrid((prevGrid) =>
            prevGrid.map((cell) => ({
                ...cell,
                isHighlighted: cellMates.includes(cell.id),
            })),
        );
    };

    const clearHighlights = () => {
        setGrid((prevGrid) =>
            prevGrid.map((cell) => ({
                ...cell,
                isHighlighted: false,
            })),
        );
    };

    useEffect(() => {
        if (prevGridRef.current) {
            grid.forEach((cell, index) => {
                const prevCell = prevGridRef.current
                    ? prevGridRef.current[index]
                    : null;
                if (prevCell && cell.value !== prevCell.value) {
                    const sudokuArray = convertGridToArray(grid);
                    console.log(sudokuArray);
                    console.log(timer);
                }
            });
        }
        prevGridRef.current = grid;
    }, [grid]);

    return {
        grid,
        updateCellValue,
        highlightMates,
        clearHighlights,
        formattedTime,
    };
};
