<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectAnnouncementController extends Controller
{

    public function show($project_id)
    {
        $project = Project::find($project_id);

        if (!$project) {
            return response()->json(['success'=>false,'message' => 'Project not found'], 404);
        }
        $announcements = Announcement::where('project_id',$project_id)->get();
        $res = [
            'success'=>true,
            'project_id'=> $project->id,
            'announcements' => $announcements
        ];
        $status = 200;

        return response()->json($res,$status);
    }

}
