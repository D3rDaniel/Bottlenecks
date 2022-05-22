<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class UserBookingController extends Controller
{
    public function show($user_id)
    {
        $bookings = Booking::where('user_id',$user_id)->get();

        if($bookings ->isEmpty()){
            return response()->json(['message' => 'No Bookings found'], 404);
        }

        return response()->json($bookings);
    }

}
