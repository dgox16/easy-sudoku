import { Sudoku } from "./components/sudokuComponents/Sudoku.tsx";
import { Navbar } from "./components/uiComponents/Navbar.tsx";

function App() {
    return (
        <div className="bg-polar-night-0 text-snow-storm-2">
            <Navbar />
            <main className="mt-20">
                <Sudoku />
            </main>
        </div>
    );
}

export default App;
