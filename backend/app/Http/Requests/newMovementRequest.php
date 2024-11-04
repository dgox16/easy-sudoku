<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

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
            'game_id' => 'required|integer|exists:games,id',
            'current_grid' => 'required|array|size:9',
            'current_grid.*' => 'array|size:9',
            'current_grid.*.*' => 'integer|min:0|max:9',
            'timer' => 'required|integer',
        ];
    }
}
