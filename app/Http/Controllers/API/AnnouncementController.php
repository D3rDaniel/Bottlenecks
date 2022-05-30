<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnouncementRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Announcement;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    /**
     * Store a newly created Announcment
     *
     */
    public function store(StoreAnnouncementRequest $request)
    {
        $data = $request->validated();

        if(!(Project::find($data['project_id'])->members()->find($data['user_id']))){
            return response()->json([
                'success' => false,
                'message' => 'User not part of project',
            ], 422);
        }

        $announcement= Announcement::create($data);

        if($announcement){
            $res = ['success'=>true, 'Announcement'=>$announcement];
            $status = 201;
        }else{
            $res = ['success'=>false,'message'=>'Announcement could not be created'];
            $status = 500;
        }

        return response()->json($res, $status);
        //TODO: Generate EMAIL
    }

    /**
     * Show project by id
     *
     */
    public function show($project_id)
    {
        $announcements = Announcement::where('project_id',$project_id)->get();

        if($announcements->isEmpty()){
            return response()->json(['message' => 'No announcements found'], 404);
        }

        return response()->json($announcements);
    }

    public function showProjectUser($project_id,$user_id)
    {
        $announcements = Announcement::where('project_id',$project_id)->where('user_id',$user_id)->get();

        if($announcements->isEmpty()){
            return response()->json(['message' => 'No announcement found'], 404);
        }

        return response()->json($announcements);
    }

    /**
     * Update announcement.
     *
     */
    public function update(UpdateAnnouncementRequest $request, $id)
    {
        $data = $request->safe()->only(['subject', 'message']);

        try {
            $announcement = Announcement::findOrFail($id);

            $announcement->update($data);
            $res = [
                'success' => true,
                'user' => $announcement,
            ];
            return response()->json($res, 200);
        } catch (\Exception $e) {
            $res = [
                'success' => false,
                'message' => 'Announcement was not found.'
            ];
            return response()->json($res, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $announcement = Announcement::find($id);
        if (!$announcement) {
            return response()->json([
                'success' => false,
                'message' => 'Announcement not found',
            ], 404);
        }
        $announcement->delete();
        return response()->json([
            'success' => true,
            'message' => 'Announcement deleted',
        ], 200);

    }
}
