<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Mockery\Exception;

class UserController extends Controller
{
    /**
     * Display all verified Users
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
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
     * @param StoreUserRequest $request
     * @return JsonResponse
     */
    public function store(StoreUserRequest $request): JsonResponse
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
     * Display a user by id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $data = User::find($id);

        if(empty($data)){
            return response()->json(['message'=>'User not found'],404);
        }

        return response()->json($data);
    }

    /**
     * Update user data.
     *
     * @param UpdateUserRequest $request
     * @return JsonResponse
     */
    public function update(UpdateUserRequest $request): JsonResponse
    {
        //get the id of the current user
        $id = auth()->user()->id;
        try {
            $user = User::findOrFail($id);

            $data = $request->safe()->only(
                [
                    'email',
                    'password',
                    'first_name',
                    'last_name',
                    'username',
                ]
            );

            $pwd_changed = false;
            if(isset($data['password'])){
                $user->password =  $fields['password'] = Hash::make($data['password']);
                $user->save();
                $pwd_changed = true;
            }

            $user->update($data);

            $res = [
                'success' => true,
                'password_changed' => $pwd_changed,
                'user' => $user
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
     * @return JsonResponse
     */
    public function destroy(): JsonResponse
    {
        $id = auth()->user()->id;

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
