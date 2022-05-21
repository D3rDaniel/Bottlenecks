<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Nette\Utils\DateTime;

class BookingController extends Controller
{
    /**
     * Display a listing of all bookings
     *
     */
    public function index()
    {
        $bookings = Booking::get();

        if($bookings->isEmpty()){
            return response()->json(['message' => 'No bookings found'], 404);
        }

        return response()->json($bookings);
    }

    /**
     * Store a new booking
     *
     */
    public function store(StoreBookingRequest $request)
    {
        //validate request
        $data = $request->validated();

        //check if date is on weekend and room is open on weekends
        $room = Room::find($data['room_id']);
        $date = Carbon::create($data['reservation_date']);
        if($room->opened_on_weekends==0&&$date->isWeekend()){
            return response()->json(['message' => 'This room is not open at the weekend'], 422);
        }

        //check if the timeslot is available
        $timeslot = CarbonPeriod::create($data['start_time'], $data['end_time']); //timeslot of new booking
        //get the opening hours of the room
        $room = Room::find($data['room_id']);
        $room_opening_hours = CarbonPeriod::create($room->opening_time, $room->closing_time);
        //check if the timeslot of the booking is within the timeslot of the opening_hours
        if (!$timeslot->overlaps($room_opening_hours)) {
            return response()->json(['error' => 'The timeslot of the booking is not within the time range of the opening hours'], 422);
        }

        //Check if the timeslot is available
        $bookings = Booking::where('room_id', $data['room_id'])->get();
        if(!$bookings->isEmpty()){
            foreach($bookings as $booking){
                $booking_timeslot = CarbonPeriod::create($booking->start_time, $booking->end_time);
                if($timeslot->overlaps($booking_timeslot)){
                    return response()->json(['message' => 'This timeslot is not available'], 422);
                }
            }
        }
        //Create new booking

        $booking = Booking::create($data);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking could not be created',
                'data' => $booking
            ], 500);
        }

        return response()->json($booking, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                'message' => 'Booking not found',
                'status' => 'error'
            ], 404);
        }
        return response()->json($booking, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                'message' => 'Booking not found',
                'status' => 'error'
            ], 404);
        }
        $booking->delete();
        return response()->json([
            'message' => 'Booking deleted',
            'status' => 'success'
        ], 200);
    }
}
