<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnouncementRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Announcement;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 *
 */
class AnnouncementController extends Controller
{
    /**
     * Store a newly created Announcment
     * @param StoreAnnouncementRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(StoreAnnouncementRequest $request):JsonResponse
    {
        $data = $request->validated();

        /*if(!(Project::find($data['project_id'])->members()->find($data['user_id']))){
            return response()->json([
                'success' => false,
                'message' => 'User not part of project',
            ], 422);
        }*/

        $this->authorize('create', [Announcement::class,$data['project_id']]);

        $data['user_id'] = Auth::id();

        $announcement= Announcement::create($data);

        if($announcement){
            $res = ['success'=>true, 'Announcement'=>$announcement];
            $status = 201;
        }else{
            $res = ['success'=>false,'message'=>'Announcement could not be created'];
            $status = 500;
        }

        return response()->json($res, $status);
    }

    /**
     * Show project by id
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id):JsonResponse
    {
        try {
            $announcement = Announcement::findOrFail($id);

            $this->authorize('view', [$announcement]);

            $res = [
                'success'=>true,
                'task'=>$announcement
            ];

            return response()->json($res,200);
        }
        catch (ModelNotFoundException $e){
            $res = [
                'success'=>false,
                'message'=>'Announcement was not found.'
            ];
            return response()->json($res,404);
        }
    }

    /**
     * Update announcement.
     * @param UpdateAnnouncementRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(UpdateAnnouncementRequest $request, $id):JsonResponse
    {
        $data = $request->safe()->only(['subject', 'message']);

        try {
            $announcement = Announcement::findOrFail($id);

            $this->authorize('update', [$announcement]);

            $announcement->update($data);
            $res = [
                'success' => true,
                'user' => $announcement,
            ];
            return response()->json($res, 200);
        } catch (ModelNotFoundException $e) {
            $res = [
                'success' => false,
                'message' => 'Announcement was not found.'
            ];
            return response()->json($res, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id):JsonResponse
    {
        try {
            $announcement = Announcement::findOrFail($id);

            $this->authorize('forceDelete', [$announcement]);
        }
        catch (ModelNotFoundException $e) {
            return response()->json(['success'=>false, 'message' => 'Announcement not found'], 404);
        }
        if($announcement->delete()) {
            return response()->json(['success' => true, 'message' => 'Announcement deleted.'], 200);
        }
        else {
            return response()->json(['success'=>false,'message' => 'Announcement could not be deleted. Cause unknown.'], 500);
        }

    }
}
