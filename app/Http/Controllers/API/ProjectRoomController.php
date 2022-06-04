<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Room;
use Illuminate\Http\Request;

class ProjectRoomController extends Controller
{
    /**
     * Show all roms of a project
     * @param $projectId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($projectId): \Illuminate\Http\JsonResponse
    {
        $project = Project::find($projectId);

        if (!$project) {
            return response()->json(['success'=>false,'message' => 'Project not found'], 404);
        }

        $rooms = Room::where('project_id', $projectId)
            ->get();

        $res = [
            'success'=>true,
            'project_id'=> $project->id,
            'rooms' => $rooms
        ];
        $status = 200;

        return response()->json($res,$status);
    }
}
