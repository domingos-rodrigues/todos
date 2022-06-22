<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
     * @queryParam name string Required Name. With a minimum of 3 and a maximum of 255 characters
     * @queryParam email string Required email
     * @queryParam password string Required Password string
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:255',
            'email' => ['required', 'string', 'email', 'unique:users'],
            'password' => 'required|string|min:8|max:25'
        ];
    }
}
