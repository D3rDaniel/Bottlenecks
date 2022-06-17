<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreRoomRequest extends FormRequest
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
            'title' => 'required|string|max:20',
            'description' => 'string|max:1000',
            'room_number' => 'string|max:12',
            'capacity' => 'int|digits_between:1,11',
            'equipment_info' => 'string|max:800',
            'address_info' => 'string|max:500',
            'opening_time' => 'date_format:H:i:s',
            'closing_time' => 'date_format:H:i:s|after:opening_time',
            'opened_on_weekends'=>'integer|digits_between:0,1',
            'project_id' => 'required|exists:projects,id',
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator): array
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
