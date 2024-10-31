<?php

namespace App\Services;

class SudokuGenerator extends Sudoku
{
    public function generate(): array
    {
        $this->fillRemaining(0, 0);
        return $this->getBoard();
    }

    private function fillRemaining($row, $col): bool
    {
        if ($row >= $this->size) {
            return true;
        }

        if ($col >= $this->size) {
            return $this->fillRemaining($row + 1, 0);
        }

        if ($this->board[$row][$col] != 0) {
            return $this->fillRemaining($row, $col + 1);
        }

        $numbers = range(1, 9);
        shuffle($numbers);

        foreach ($numbers as $num) {
            if ($this->isSafe($row, $col, $num)) {
                $this->board[$row][$col] = $num;

                if ($this->fillRemaining($row, $col + 1)) {
                    return true;
                }

                $this->board[$row][$col] = 0;
            }
        }
        return false;
    }

    public function removeNumbers(int $count): array
    {
        while ($count > 0) {
            $row = rand(0, $this->size - 1);
            $col = rand(0, $this->size - 1);

            if ($this->board[$row][$col] != 0) {
                $backup = $this->board[$row][$col]; // Hacer un respaldo del valor
                $this->board[$row][$col] = 0; // Eliminar el valor

                if ($this->hasUniqueSolution()) {
                    $count--;
                } else {
                    $this->board[$row][$col] = $backup; // Revertir el cambio
                }
            }
        }

        return $this->getBoard();
    }

    private function hasUniqueSolution(): bool
    {
        return $this->countSolutions() === 1;
    }

    private function countSolutions(int $row = 0, int $col = 0): int
    {
        if ($row >= $this->size) {
            return 1; // Solución encontrada
        }

        if ($col >= $this->size) {
            return $this->countSolutions($row + 1); // Ir a la siguiente fila
        }

        if ($this->board[$row][$col] != 0) {
            return $this->countSolutions($row, $col + 1); // Ir a la siguiente columna
        }

        $count = 0;
        for ($num = 1; $num <= 9; $num++) {
            if ($this->isSafe($row, $col, $num)) {
                $this->board[$row][$col] = $num; // Colocar el número

                $count += $this->countSolutions($row, $col + 1); // Recursión

                $this->board[$row][$col] = 0; // Limpiar para seguir probando
            }
        }

        return $count;
    }
}
