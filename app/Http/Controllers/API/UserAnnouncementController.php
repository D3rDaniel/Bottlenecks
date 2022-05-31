<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Http\Request;

class UserAnnouncementController extends Controller
{
    public function show($user_id)
    {
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['success'=>false,'message' => 'User not found'], 404);
        }
        $announcements = Announcement::where('user_id',$user_id)->get();
        $res = [
            'success'=>true,
            'user_id'=> $user->id,
            'announcements' => $announcements
        ];
        $status = 200;

        return response()->json($res,$status);

    }
}
