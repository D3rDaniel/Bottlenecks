<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateTaskRequest extends FormRequest
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
            'assignee_user_id' => 'exists:users,id',
            'status_id' => 'exists:statuses,id',
            'priority_id' => 'exists:priorities,id',
            'tag_id' => 'exists:tags,id',
            'title' => 'string|max:255',
            'description' => 'string|max:1000',
            'due_date' => 'date',
            'due_time' => 'date_format:H:i',
            'completion_comment' => 'string|max:255'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.*
     * @return array
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator): array
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
