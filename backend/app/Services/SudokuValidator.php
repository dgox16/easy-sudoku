<?php

namespace App\Services;
class SudokuValidator {
    private $board;

    public function __construct(array $board) {
        $this->board = $board;
    }

    public function isValid(): bool {
        return $this->checkRows() && $this->checkCols() && $this->checkSubgrids();
    }

    private function checkRows(): bool {
        for ($row = 0; $row < 9; $row++) {
            if (!$this->isUnique($this->board[$row])) {
                return false;
            }
        }
        return true;
    }

    private function checkCols(): bool {
        for ($col = 0; $col < 9; $col++) {
            $column = [];
            for ($row = 0; $row < 9; $row++) {
                $column[] = $this->board[$row][$col];
            }
            if (!$this->isUnique($column)) {
                return false;
            }
        }
        return true;
    }

    private function checkSubgrids(): bool {
        for ($row = 0; $row < 3; $row++) {
            for ($col = 0; $col < 3; $col++) {
                $subgrid = [];
                for ($i = 0; $i < 3; $i++) {
                    for ($j = 0; $j < 3; $j++) {
                        $subgrid[] = $this->board[$row * 3 + $i][$col * 3 + $j];
                    }
                }
                if (!$this->isUnique($subgrid)) {
                    return false;
                }
            }
        }
        return true;
    }

    private function isUnique(array $values): bool {
        $seen = [];
        foreach ($values as $value) {
            if ($value != 0) { // Ignorar los ceros (celdas vacías)
                if (in_array($value, $seen)) {
                    return false; // El valor ya fue visto
                }
                $seen[] = $value;
            }
        }
        return true;
    }
}
