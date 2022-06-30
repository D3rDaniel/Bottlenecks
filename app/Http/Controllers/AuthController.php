<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {

        $fields = $request->validated();

        $fields['password'] = Hash::make($fields['password']);

        $user = User::create($fields);

        $response=[
            'success'=>true,
            'user' => $user,
        ];

        return response()->json($response, 201);

    }

    /**
     * Logout a user.
     * Deletes all API tokens of the user.
     *
     * @param Request $request
     * @return JsonResponse success: true -> user logged out
     */
    public function logout(Request $request): JsonResponse
    {
        //revoke all tokens
        auth()->user()->tokens()->delete();

        return response()->json([
            'success'=>true,
        ], 200);
    }

    /**
     * Login a user.
     *
     * @param Request $request
     * @return JsonResponse logged in user
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required'
        ]);

        $user = User::where('email',$credentials['email'])->first();

        if(!$user){
            return response()->json(['message' => 'User not found.'],404);
        }

        //Check users password
        if(!$user || !Hash::check($credentials['password'],$user->password)){
            return response()->json(['message' => 'Invalid credentials.'],401);
        }

        $token = $user->createToken('token')->plainTextToken;

        $response=[
            'success' => true,
            'username'=>$user,
            'bearer_token' => $token
        ];

        return response()->json($response,200);
    }
}
