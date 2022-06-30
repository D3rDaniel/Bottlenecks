<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompleteTaskRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreTaskRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     * Exception is automatically handled by Laravel
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {

        $data = $request->safe()->only(
            [
            'assignee_user_id',
            'project_id',
            'status_id',
            'priority_id',
            'tag_id',
            'title',
            'description',
            'due_date',
            'due_time']
        );

        //get assigned user
        $assignee = User::find($data['assignee_user_id']);

        //check if assignee is a project-member or the project owner
        if (!$assignee->isMemberOfProject($data['project_id']) && !$assignee->isOwnerOfProject($data['project_id'])) {
                return response()->json(['success'=>false,'message' => 'Assignee is not a member of the project.'], 400);
        }


        //authorize
        $this->authorize('create', [Task::class,$data['project_id']]);

        $data['creator_user_id'] = Auth::id();

        $new_task = Task::create($data);

        if(!$new_task){
            $res = [
                'success' => false,
                'message'=>'Task could not be created.'
            ];

            $status = 500;
        }
        else{
            $res = [
                'success' => true,
                'task'=>$new_task
            ];
            $status = 201;
        }

        return response()->json($res, $status);
    }

    /**
     * Returns the specified task.
     *
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function show($id): JsonResponse
    {
        try {
            $task = Task::findOrFail($id);

            $this->authorize('view', $task);

            $res = [
                'success'=>true,
                'task'=>$task
            ];

            return response()->json($res,200);
        }
        catch (ModelNotFoundException $e){
            $res = [
                'success'=>false,
                'message'=>'Task was not found.'
            ];
            return response()->json($res,404);
        }
    }

    /**
     * Update the task in storage.
     *
     * @param UpdateTaskRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdateTaskRequest $request, $id): JsonResponse
    {
        $data = $request->safe()->only(
            [
                'assignee_user_id',
                'status_id',
                'priority_id',
                'tag_id',
                'title',
                'description',
                'due_date',
                'due_time',
                'completion_comment'
            ]
        );

        try {
            $task = Task::findOrFail($id);

            $this->authorize('update', $task);

            //check if the assignee user_id field in $data exists
            if(array_key_exists('assignee_user_id', $data)){
                //get assigned user
                $assignee = User::find($data['assignee_user_id']);

                //check if new assignee is a project-member
                if (!$assignee->isMemberOfProject($task->project_id)) {
                    return response()->json(['success'=>false,'message' => 'Assignee is not a member of the project.'], 400);
                }
            }

            $task->update($data);
            $res = [
                'success' => true,
                'task' => $task,
            ];
            return response()->json($res, 200);
        } catch (ModelNotFoundException $e) {
            $res = [
                'success' => false,
                'message' => 'Task not found.'
            ];
            return response()->json($res, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy($id): JsonResponse
    {
        try {
            $task = Task::findOrFail($id);

            $this->authorize('forceDelete', $task);
        }
        catch (ModelNotFoundException $e) {
            return response()->json(['success'=>false, 'message' => 'Task not found'], 404);
        }
        if($task->delete()) {
            return response()->json(['success' => true, 'message' => 'Task deleted.'], 200);
        }
        else {
            return response()->json(['success'=>false,'message' => 'Task could not be deleted. Cause unknown.'], 500);
        }
    }

    /**
     * Complete the task.
     *
     * @param  int  $id
     * @param CompleteTaskRequest $request
     * @return JsonResponse
     */
    public function completeTask(CompleteTaskRequest $request,$id): JsonResponse
    {

        $data = $request->safe()->only(['completion_comment']);

        $data['completed_date']=now()->toDateString();
        $data['completed_time']=now()->toTimeString();
        $data['status_id']=1;

        try {
            $task = Task::findOrFail($id);

            $this->authorize('complete', $task);

            $task->update($data);

            $res= [
                'success'=>true,
                'data'=>$data,
                //'task'=>$task
            ];
            return response()->json($res, 201);
        }
        catch (ModelNotFoundException $e) {
            return response()->json(['success'=>false, 'message' => 'Task not found.'], 404);
        }

    }
}
