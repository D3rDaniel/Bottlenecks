<?php

namespace App\Http\Controllers\API;

use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class TaskUserController
{

    /**
     * Get all tasks with the specified status (by slug)
     * of the currently authenticated user.
     *
     *
     * @param string $slug
     * @return JsonResponse
     */
    public function getTasks(string $slug): JsonResponse
    {
        //check if slug is null
        if ($slug == null) {
            return response()->json(['error' => 'No slug provided'], 400);
        }

        $user_id =  Auth::user()->getAuthIdentifier();

        $user = User::find($user_id);
        //check if user exists
        if(empty($user)){
            return response()->json(['success'=>false,'message'=>'User not found'],404);
        }
        $status = Status::where('slug',$slug)->first();
        //check if status exists
        if(empty($status)){
            return response()->json(['success'=>false,'message'=>'Status not found'],404);
        }

        $tasks = $user->tasksAssigned()
            ->with(['creator' => function ($query) {
                $query->select('id', 'username');
            },'project' => function ($query) {
                $query->select('id', 'title');
            },'priority','tag','status'])
            ->where('status_id',$status->id)
            ->orderBy('due_date','asc')
            ->get();


        return response()->json(['success'=>true,'tasks'=>$tasks],200);
    }

}
