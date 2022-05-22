<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class UserAnnouncementController extends Controller
{
    public function show($user_id)
    {
        $announcements = Announcement::where('user_id',$user_id)->get();

        if($announcements->isEmpty()){
            return response()->json(['message' => 'No announcements found'], 404);
        }

        return response()->json($announcements);
    }
}
