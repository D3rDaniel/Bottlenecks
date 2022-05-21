<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display all Rooms
     *
     */
    public function index()
    {
        $rooms = Room::get();

        if($rooms->isEmpty()){
            return response()->json(['message' => 'No rooms found'], 404);
        }

        return response()->json($rooms);
    }

    /**
     * Store a newly created room in storage.
     */
    public function store(StoreRoomRequest $request)
    {
        $data = $request->validated();

        $room= Room::create($data);

        if(!$room){
            return response()->json([
                'message' => 'Room could not be created',
                'data' => $room
            ], 500);
        }

        return response()->json($room, 201);
    }

    /**
     * Display a Room by Id.
     *
     */
    public function show($id)
    {
        $room = Room::find($id);

        if(empty($room)){
            return response()->json(['message'=>'Room not found'],404);
        }

        return response()->json($room);
    }

    /**
     * Update a room.
     *
     */
    public function update(UpdateRoomRequest $request, $id)
    {
        $data = $request->safe()->only(
            [
                'capacity',
                'description',
                'equipment_info',
                'opening_time',
                'closing_time',
                'opened_on_weekends',
            ]
        );

        try {
            $room = Room::findOrFail($id);

            $room->update($data);
            $res = [
                'success' => true,
                'room' => $room,
            ];
            return response()->json($res, 200);
        } catch (\Exception $e) {
            $res = [
                'success' => false,
                'message' => 'Room was not found.'
            ];
            return response()->json($res, 404);
        }
    }

    /**
     * Remove a room by id.
     *
     */
    public function destroy($id)
    {
        $room = Room::find($id);
        if(empty($room)){
            return response()->json(['deleted'=>false,'message'=>'Room not found'],404);
        }
        if($room->delete()){
            return response()->json(['deleted'=>true],200);
        }
        return response()->json(['deleted'=>false,'message'=>'Room could not be deleted'],404);
    }
}
