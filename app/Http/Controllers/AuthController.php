<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){

        $fields = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'username' => 'required|string|unique:users',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user = User::create(
            $fields
        );

        $response=[
            'success'=>true,
            'user' => $user,
        ];

        return response($response,201);

    }

    public function logout(Request $request){
        //revoke all tokens
        auth()->user()->tokens()->delete();

        return ['message' => 'Successfully logged out'];
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required'
        ]);

        $user = User::where('email',$credentials['email'])->first();

        if(!$user){
            return response(['message' => 'No user found'],404);
        }

        //Check users password
        if(!$user || !Hash::check($credentials['password'],$user->password)){
            return response(['message' => 'Invalid credentials'],401);
        }

        //if(!auth()->attempt($credentials)){
        //   return response(['message' => 'Invalid credentials'],401);
        //}

        $token = $user->createToken('token')->plainTextToken;


        $response=[
            'success' => true,
            'username'=>$user,
            'bearer_token' => $token
        ];

        return response()->json($response,200);
    }
}
