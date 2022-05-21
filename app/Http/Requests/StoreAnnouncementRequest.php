<?php

namespace App\Http\Requests;

use HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;

class StoreAnnouncementRequest extends FormRequest
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
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:10000',
            'user_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',

        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator): array
    {
        throw new \Illuminate\Http\Exceptions\HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
