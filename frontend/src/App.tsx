import { Cell } from "./Cell";
import { useSudokuGrid } from "./hooks/useGenerateSudoku.tsx";
import { getCellMates } from "./libs/getCellMates.ts";

function App() {
    const { grid, setGrid, updateCellValue } = useSudokuGrid();

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
        <div className="flex justify-center items-center h-screen bg-polar-night-0">
            <div className="grid grid-cols-9 p-6 rounded-xl bg-polar-night-1">
                {grid.map((cell) => (
                    <Cell
                        cell={cell}
                        key={cell.id}
                        updateCellValue={updateCellValue}
                        highlightMates={highlightMates}
                        clearHighlights={clearHighlights}
                        cellMates={getCellMates(grid, cell)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
