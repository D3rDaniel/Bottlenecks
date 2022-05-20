<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProjectTaskController extends Controller
{
    /**
     * Return all tasks within the project.
     *
     * @param $projectId
     * @return JsonResponse
     */
    public function index($projectId): JsonResponse
    {
        $project = Project::find($projectId);

        if (!$project) {
            return response()->json(['success'=>false,'message' => 'Project not found'], 404);
        }

        $tasks = Task::where('project_id', $projectId)
            ->with('assignee','creator','status','tag','priority')
            ->get();

            $res = [
                'success'=>true,
                'project_id'=> $project->id,
                'tasks' => $tasks
            ];
            $status = 200;

        //TODO: paginate
        return response()->json($res,$status);
    }
}
