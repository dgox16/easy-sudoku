import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [sudoku, setSudoku] = useState([
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ]);

    useEffect(() => {
        const getFirstSudoku = async () => {
            const { data } = await axios.get("http://localhost:8000/sudoku/generate");
            setSudoku(data.sudoku);
            const getCellBlock = (row, column) => {
                return Math.floor((row - 1) / 3) * 3 + Math.floor((column - 1) / 3) + 1;
            };

            const createGridFromArray = (array) => {
                return array.flatMap((row, rowIndex) => {
                    return row.map((value, columnIndex) => ({
                        id: String.fromCharCode(97 + rowIndex) + (columnIndex + 1), // 'a' es 97 en ASCII
                        column: columnIndex + 1,
                        row: rowIndex + 1,
                        block: getCellBlock(rowIndex + 1, columnIndex + 1),
                        initialValue: value,
                        isHighlighted: false,
                    }));
                });
            };

            const gridObjects = createGridFromArray(data.sudoku);

            console.log(gridObjects);
        };
        getFirstSudoku();
    }, []);
    return (
        <div>
            {sudoku.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, cellIndex) => (
                        <div
                            key={cellIndex}
                            className={`w-12 h-12 flex items-center justify-center border ${
                                cell === 0 ? "bg-red-500" : "bg-white"
                            }`}
                        >
                            {cell !== 0 ? (
                                cell
                            ) : (
                                <input
                                    type="number"
                                    min="0" // Establece el valor mínimo permitido (opcional)
                                    className="size-12 bg-zinc-200 text-center"
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default App;
