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
        $user = auth()->user();
        //TODO
        //check if user is owner
        //check if user is project member
            //check if user is allowed to create tasks
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
            //TODO:validate combination of user_id and project_id in project_users
            'creator_user_id' => 'required|exists:users,id',
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
     */
    protected function failedAuthorization(): array
    {
        throw new HttpResponseException(response()->json([
            'errors' => 'unauthorized.'
        ], 403));
    }
}
