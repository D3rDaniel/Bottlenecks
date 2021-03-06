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
     * Store a newly created room in storage.
     * @param StoreRoomRequest $request
     * @return \Illuminate\Http\JsonResponse
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

        else{
            $res = [
                'success' => true,
                'room'=>$room
            ];
            $status = 201;
        }

        return response()->json($res, $status);

    }

    /**
     * Display a Room by Id.
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $room = Room::find($id);
        $this->authorize('show', [$room]);

        if(empty($room)){
            return response()->json(['message'=>'Room not found'],404);
        }

        return response()->json($room);
    }

    /**
     * Update a room.
     * @param UpdateRoomRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRoomRequest $request, $id)
    {
        $data = $request->safe()->only(
            [
                'title',
                'description',
                'room_number',
                'capacity',
                'equipment_info' ,
                'address_info',
                'equipment_info',
                'opening_time',
                'closing_time',
                'opened_on_weekends',
            ]
        );

        try {
            $room = Room::findOrFail($id);
            $this->authorize('update', [$room]);

            $room->update($data);
            $res = [
                'success' => true,
                'room' => $room,
            ];
            return response()->json($res, 201);
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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $room = Room::find($id);
        $this->authorize('forceDelete', [$room]);
        if(empty($room)){
            return response()->json(['success' => false,'message'=>'Room not found'],404);
        }
        if($room->delete()){
            return response()->json(['success' => true],200);
        }
        return response()->json(['success' => false,'message'=>'Room could not be deleted'],500);
    }
}
