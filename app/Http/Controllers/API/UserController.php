<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display all verified Users
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::where('email_verified_at', '!=', NULL)->get();

        if($users->isEmpty()){
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json($users);
    }

    /**
     * Store a newly created user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);

        if(!$user){
            return response()->json([
                'message' => 'User could not be created',
                'data' => $user
            ], 500);
        }

        return response()->json($user, 201);
    }

    /**
     * Display a user by his id
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $data = User::find($id);

        if(empty($data)){
            return response()->json(['message'=>'User not found'],404);
        }

        return response()->json($data);
    }

    /**
     * Update User
     *

     */
    public function update(UpdateUserRequest $request, $id)
    {
        $data = $request->safe()->only(
            [
                'email',
                'password',
                'first_name',
                'last_name',
            ]
        );

        try {
            $user = User::findOrFail($id);

            $user->update($data);
            $res = [
                'success' => true,
                'user' => $user,
            ];
            return response()->json($res, 200);
        } catch (\Exception $e) {
            $res = [
                'success' => false,
                'message' => 'User was not found.'
            ];
            return response()->json($res, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if(empty($user)){
            return response()->json(['deleted'=>false,'message'=>'User not found'],404);
        }
        if($user->delete()){
            return response()->json(['deleted'=>true],200);
        }
        return response()->json(['deleted'=>false,'message'=>'User could not be deleted'],404);

    }
}
