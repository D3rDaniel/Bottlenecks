<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;

class UserBookingController extends Controller
{
    /**
     * Show all bookings of a user
     * @param $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($user_id)
    {
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['success'=>false,'message' => 'User not found'], 404);
        }

        $bookings = Booking::where('user_id',$user_id)
            ->with('room','user')
            ->get();

        $res = [
            'success'=>true,
            'user_id'=> $user->id,
            'bookings' => $bookings
        ];
        $status = 200;

        return response()->json($res,$status);
    }

}
