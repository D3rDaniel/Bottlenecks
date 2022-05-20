<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectUserRequest;
use App\Http\Requests\UpdateProjectUserRequest;
use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\User;
use Illuminate\Http\Request;

//Controller for operations of project-members
class ProjectUserController extends Controller
{
    /**
     * Return a listing of all project members and their rights.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($project_id)
    {
        try {
            $project = Project::findOrFail($project_id);
        }
        catch (\Exception $e){
            return response()->json([
                'success'=>false,
                'message'=>'Project Not found.'
            ], 404);
        }
        $members = $project->members()->get();

        $res = [
            'success'=>true,
            'project_id'=>$project->id,
            'members'=>$members
        ];

        return response()->json($res, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreProjectUserRequest $request)
    {
        $data = $request->safe()->only(
            ['username',
            'project_id',
            'can_create_tasks',
            'can_assign_tasks',
            'can_edit_tasks',
            'can_create_tags']);

        $user = User::where('username',$data['username'])->first();


        $member = ProjectUser::where('project_id', $data['project_id'],)
                            ->where('user_id',$user->id)->first();

        if(!$member){

            $data['user_id']=$user->id;

            $new_member = ProjectUser::create($data);

            if(!$new_member){
                $res = [
                    'success' => false,
                    'message'=>'Member could not be added.'
                ];

                $status = 400;
            }
            else{
                $res = [
                    'success' => true,
                    'project-member'=>$new_member
                ];
                $status = 201;
            }
        }
        else{
            //member is not null -> already part of the project
            $res = [
                'success' => false,
                'message'=>'Member is already part of the project.'
            ];

            $status = 500;
        }

        return response()->json($res,$status);
    }


    /**
     * Update ProjectUsers (members) rights.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateProjectUserRequest $request, $id)
    {
        $data = $request->safe()->only(['can_create_tasks',
            'can_assign_tasks',
            'can_edit_tasks',
            'can_create_tags']);

        try {
            $member = ProjectUser::findOrFail($id);
            $member->update($data);

            $res = [
                'success'=>true,
                'member'=>$member
            ];

            return response()->json($res, 201);
        }
        catch(\Exception $e){
            $res = [
                'success'=>false,
                'message'=> 'ProjectUser id not found.'
            ];
            response()->json($res,404);
        }

        return response()->json(['success'=>false, 'message'=> 'Unknown error.'],500);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $member = ProjectUser::find($id);
        if(!$member){
            return response()->json(['success'=>true,'message' => 'Member does not exist and therefore can not be deleted.'],404);
        }
        if($member->delete()){
            return response()->json(['success'=>true,'message'=>'Deleted.'],200);
        }
        return response()->json(['success'=>false],500);
    }
}
