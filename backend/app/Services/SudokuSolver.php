<?php
namespace App\Services;
class SudokuSolver extends Sudoku
{
    public function solve(): array
    {
        $this->solveSudoku(0, 0);
        return $this->getBoard();
    }

    private function solveSudoku(int $row, int $col): bool
    {
        if ($row >= $this->size) {
            return true; // Sudoku solucionado
        }

        if ($col >= $this->size) {
            return $this->solveSudoku($row + 1, 0); // Siguiente fila
        }

        if ($this->board[$row][$col] != 0) {
            return $this->solveSudoku($row, $col + 1); // Siguiente columna
        }

        for ($num = 1; $num <= 9; $num++) {
            if ($this->isSafe($row, $col, $num)) {
                $this->board[$row][$col] = $num; // Colocar el número

                if ($this->solveSudoku($row, $col + 1)) {
                    return true; // Solución encontrada
                }

                $this->board[$row][$col] = 0; // Limpiar para seguir probando
            }
        }

        return false; // No se encontró solución
    }
}
