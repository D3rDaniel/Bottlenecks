<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Http\Request;

class AnnouncementUserController extends Controller
{
    /**
     * Show All Announcements for a User
     * @param $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($user_id)
    {
        $user = User::find($user_id);
        $projects =$user->projectsWhereMember()->get();
        foreach ($projects as $project){
            $announcements = Announcement::where('project_id',$project->id)->get();
        }

        if($announcements->isEmpty()){
            return response()->json(['message' => 'No announcements found'], 404);
        }

        return response()->json($announcements);
    }
}
