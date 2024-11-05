<?php

namespace App\Services;

use App\Enums\SudokuDifficult;

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

    public function removeNumbers(SudokuDifficult $difficult): array
    {
        $count = $difficult->getCount();
        $positions = [];

        for ($i = 0; $i < $this->size; $i++) {
            for ($j = 0; $j < $this->size; $j++) {
                $positions[] = [$i, $j];
            }
        }

        shuffle($positions); // Mezcla las posiciones para probar en orden aleatorio

        foreach ($positions as [$row, $col]) {
            if ($count <= 0) {
                break;
            }

            if ($this->board[$row][$col] != 0) {
                $backup = $this->board[$row][$col];
                $this->board[$row][$col] = 0;

                if ($this->hasUniqueSolution()) {
                    $count--;
                } else {
                    $this->board[$row][$col] = $backup;
                }
            }
        }

        return $this->getBoard();
    }

    private function hasUniqueSolution(): bool
    {
        return $this->countSolutions(0, 0, 2) === 1;
    }

    private function countSolutions(int $row = 0, int $col = 0, int $limit = 2): int
    {
        if ($row >= $this->size) {
            return 1;
        }

        if ($col >= $this->size) {
            return $this->countSolutions($row + 1, 0, $limit); // Ir a la siguiente fila
        }

        if ($this->board[$row][$col] != 0) {
            return $this->countSolutions($row, $col + 1, $limit); // Ir a la siguiente columna
        }

        $count = 0;
        for ($num = 1; $num <= 9; $num++) {
            if ($this->isSafe($row, $col, $num)) {
                $this->board[$row][$col] = $num;
                $count += $this->countSolutions($row, $col + 1, $limit); // Recursión
                $this->board[$row][$col] = 0;

                if ($count >= $limit) {
                    return $count;
                }
            }
        }

        return $count;
    }
}
