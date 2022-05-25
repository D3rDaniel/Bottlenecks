<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;

class ProjectOverviewController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {

        try {
            //get project by id and return an error if it is not found
            $project = Project::findOrFail($id);

            $tasks = $project->tasks;

            $doneTasks = $tasks->where('status_id', 1)->count();
            $failedTasks = $tasks->where('status_id', 4)->count();
            $pausedTasks = $tasks->where('status_id', 3)->count();
            $inProgressTasks = $tasks->where('status_id', 2)->count();
            $members = $project->members;
            $progress = $project->calculateProgress();

            $data = [
                'success'=>true,
                'project_overview'=>[
                    'title'=>$project->title,
                    'description'=>$project->description,
                    'due_date' => $project->due_date,
                    'completed_date'=>$project->completed_date,
                    'completed_tasks' => $doneTasks,
                    'failed_tasks' => $failedTasks,
                    'paused_tasks' => $pausedTasks,
                    'in-progress_tasks' => $inProgressTasks,
                    'progress_percentage' => $progress,
                    'members' => $members
                ]
            ];

            return response()->json($data, 200);
        }
        catch (\Exception $e){
            return response()->json(['success'=>false,'message'=>'Project not found'], 404);
        }
    }
}
