import axios from "axios";
import { useEffect, useState } from "react";
import { Cell } from "./Cell";
import { createGridFromArray } from "./libs/formatSudoku";

interface CellType {
    block: number;
    column: number;
    id: string;
    isHighlighted: boolean;
    row: number;
    value: number;
}

function useSudokuGrid() {
    const [grid, setGrid] = useState<CellType[]>([]);

    useEffect(() => {
        const fetchSudoku = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/sudoku/generate");
                const gridObjects = createGridFromArray(data.sudoku);
                setGrid(gridObjects);
            } catch (error) {
                console.error("Error fetching sudoku:", error);
            }
        };
        fetchSudoku();
    }, []);

    return { grid, setGrid };
}

function App() {
    const { grid, setGrid } = useSudokuGrid();
    const [activeCell, setActiveCell] = useState<string | undefined>(undefined);

    const getCellMates = (grid: CellType[], { id, block, row, column }: CellType) => {
        return grid
            .filter(
                (cell) =>
                    cell.id !== id &&
                    (cell.row === row || cell.column === column || cell.block === block),
            )
            .map((cell) => cell.id);
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

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="grid grid-cols-9 border-4 border-zinc-800">
                {grid.map((cell) => (
                    <Cell
                        key={cell.id}
                        highlightMates={highlightMates}
                        setActiveCell={setActiveCell}
                        clearHighlights={clearHighlights}
                        cellMates={getCellMates(grid, cell)}
                        isActive={activeCell === cell.id}
                        {...cell}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
