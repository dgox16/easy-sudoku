<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property mixed $current_grid
 * @property mixed $timer
 * @property mixed $game
 */
class newMovementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'game' => 'required|integer|exists:games,id',
            'row' => 'required|integer',
            'column' => 'required|integer',
            'value' => 'required|integer',
            'timer' => 'required|integer',
        ];
    }
}
