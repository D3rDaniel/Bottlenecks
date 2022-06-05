<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAnnouncementController extends Controller
{
    /**
     * Show all announcements of a user
     * @param $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        $user = User::find(Auth::id());

        if (!$user) {
            return response()->json(['success'=>false,'message' => 'User not found'], 404);
        }
        $announcements = Announcement::where('user_id',$user->id)->get();
        $res = [
            'success'=>true,
            'user_id'=> $user->id,
            'announcements' => $announcements
        ];
        $status = 200;

        return response()->json($res,$status);

    }
}
