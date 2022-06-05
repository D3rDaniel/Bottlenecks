<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnouncementUserController extends Controller
{
    /**
     * Show All Announcements for a User
     * @param $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show():JsonResponse
    {
        $user = User::find(Auth::id());

        $projects =$user->projectsWhereMember()->get();
        $announcements=new Collection();
        foreach ($projects as $project){
            $announcement = Announcement::where('project_id',$project->id)->get();
            if(!($announcement->isempty())){
                $announcements->push($announcement);
            }
        }
        if(empty($announcements)){
            return response()->json(['message' => 'No announcements found'], 404);
        }

        return response()->json($announcements);
    }
}
