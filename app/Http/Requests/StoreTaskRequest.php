<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTaskRequest extends FormRequest
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
            'assignee_user_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
            'status_id' => 'exists:statuses,id',
            'priority_id' => 'exists:priorities,id',
            'tag_id' => 'exists:tags,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'due_date' => 'required|date',
            'due_time' => 'date_format:H:i'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.*
     * @return array
     * @throws HttpResponseException
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator): array
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }

    /**
     * Get the error messages for the defined authorization rules.*
     * @return array
     * @throws HttpResponseException
     */
    protected function failedAuthorization(): array
    {
        throw new HttpResponseException(response()->json([
            'errors' => 'unauthorized.'
        ], 403));
    }
}
