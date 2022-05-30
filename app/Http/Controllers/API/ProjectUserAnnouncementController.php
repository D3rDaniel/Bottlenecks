<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class ProjectUserAnnouncementController extends Controller
{
    public function show($project_id,$user_id)
    {
        $announcements = Announcement::where('project_id',$project_id)->where('user_id',$user_id)->get();

        if($announcements->isEmpty()){
            return response()->json([ 'success'=>false,'message' => 'No announcement found'], 404);
        }

        $res = [
            'success'=>true,
            'project_id'=> $project_id,
            'user_id' => $user_id,
            'announcements' => $announcements
        ];
        $status = 200;

        return response()->json($res,$status);

        return response()->json($announcements);
    }
}
