<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompleteTaskRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreTaskRequest $request
     * @return JsonResponse
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $data = $request->safe()->only(
            ['creator_user_id',
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        try {
            $task = Task::findOrFail($id);

            $res = [
                'success'=>true,
                'task'=>$task
            ];

            return response()->json($res,200);
        }
        catch (\Exception $e){
            $res = [
                'success'=>false,
                'message'=>'Task was not found'
            ];
            return response()->json($res,404);
        }
    }
    public function showOpenByUserId($user_id): JsonResponse
    {
        $tasks = Task::where('assignee_user_id',$user_id)->where('completed_date',NULL)->get();

        if($tasks ->isEmpty()){
            return response()->json(['message' => 'No tasks found'], 404);
        }

        return response()->json($tasks);
    }
    public function showCompletedByUserId($user_id): JsonResponse
    {
        $tasks = Task::where('assignee_user_id',$user_id)->where('completed_date','!=',NULL)->get();

        if($tasks ->isEmpty()){
            return response()->json(['message' => 'No tasks found'], 404);
        }

        return response()->json($tasks);
    }

    /**
     * Update the specified resource in storage.
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

            $task->update($data);
            $res = [
                'success' => true,
                'task' => $task,
            ];
            return response()->json($res, 200);
        } catch (\Exception $e) {
            $res = [
                'success' => false,
                'message' => 'Task was not found.'
            ];
            return response()->json($res, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        try {
            $task = Task::findOrFail($id);
        }
        catch (\Exception $e) {
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

            $task->update($data);

            $res= [
                'success'=>true,
                'data'=>$data,
                //'task'=>$task
            ];
            return response()->json($res, 201);
        }
        catch (\Exception $e) {
            return response()->json(['success'=>false, 'message' => 'Task not found.'], 404);
        }

    }
}
