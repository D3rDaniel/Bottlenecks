<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserTaskController extends Controller
{

        public function index($id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json(['success'=>false,'message'=>'User not found.'], 404);
        }

        $tasksAssigned = $user ->tasksAssigned()->get();

        $taskCreated = $user ->createdTasks()->get();


        $res = [
            'success'=>true,
            'tasks_created'=>$taskCreated,
            'tasks_assigned'=>$tasksAssigned,
        ];

        return response()->json($res,200);
    }

}
