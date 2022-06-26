<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomBookingController extends Controller
{
    /**
     * Show all bookings for a room
     * @param $room_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($room_id)
    {
        $room = Room::find($room_id);
        $this->authorize('viewAny', $room);

        if (!$room) {
            return response()->json(['success'=>false,'message' => 'Room not found'], 404);
        }

        $bookings = Booking::where('room_id',$room_id)
            ->with('room','user')
        ->get();

        $res = [
            'success'=>true,
            'room_id'=> $room->id,
            'bookings' => $bookings
        ];
        $status = 200;

        return response()->json($res,$status);
    }

}
