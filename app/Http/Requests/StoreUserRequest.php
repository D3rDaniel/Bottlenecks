<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'username' => 'required|string|max:20',
            'email' => 'required|string|email|unique:users',
            'password' => 'required',
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator): array
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
