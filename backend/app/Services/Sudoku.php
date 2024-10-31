<?php

namespace App\Services;

class Sudoku
{
    protected array $board;
    protected int $size = 9;
    protected int $subgridSize = 3;

    public function __construct(array $board = null)
    {
        if ($board === null) {
            $this->board = array_fill(0, $this->size, array_fill(0, $this->size, 0));
        } else {
            $this->board = $board;
        }
    }

    protected function isSafe(int $row, int $col, int $num): bool
    {
        for ($x = 0; $x < $this->size; $x++) {
            if ($this->board[$row][$x] == $num || $this->board[$x][$col] == $num) {
                return false; // Número ya está en la fila o columna
            }
        }

        $startRow = $row - $row % $this->subgridSize;
        $startCol = $col - $col % $this->subgridSize;
        for ($i = 0; $i < $this->subgridSize; $i++) {
            for ($j = 0; $j < $this->subgridSize; $j++) {
                if ($this->board[$i + $startRow][$j + $startCol] == $num) {
                    return false; // Número ya está en el subgrid
                }
            }
        }

        return true;
    }

    protected function getBoard(): array
    {
        return $this->board; // Obtener el tablero
    }
}
