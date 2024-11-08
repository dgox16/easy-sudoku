import { Toaster } from "sonner";
import { Sudoku } from "./components/sudokuComponents/Sudoku.tsx";
import { Navbar } from "./components/uiComponents/Navbar.tsx";

function App() {
    return (
        <div className="bg-polar-night-0 text-snow-storm-2 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-grow justify-center">
                <div className="w-full lg:w-[1000px] mt-10 lg:mt-16 mx-5 lg:mx-0">
                    <Sudoku />
                </div>
            </main>
            <footer className="flex justify-center mt-8">
                <div className=" w-recommend text-center">
                    <p className="py-2 text-[12px] sm:text-[14px]">
                        © 2024 Diego Armando Gómez Martínez.
                        <span className="hidden sm:inline"> | </span>
                        <br aria-hidden={true} className="block sm:hidden" />
                        Almost all rights reserved.
                    </p>
                </div>
            </footer>
            <Toaster
                toastOptions={{
                    unstyled: true,
                    classNames: {
                        toast: "bg-polar-night-2 w-full p-5 flex flex-row items-center border-2 border-polar-night-0 rounded-lg",
                        title: "text-base",
                        icon: "text-aurora-red mr-3",
                    },
                }}
            />
        </div>
    );
}

export default App;
