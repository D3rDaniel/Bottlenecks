<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectUserRequest;
use App\Http\Requests\UpdateProjectUserRequest;
use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Exception;

//Controller for operations for/of project-members
class ProjectUserController extends Controller
{
    /**
     * Return a listing of all project members and their rights.
     *
     * @return JsonResponse
     * @throws AuthorizationException if the user is not a member or the owner of the project
     */
    public function index($project_id)
    {
        try {
            $project = Project::findOrFail($project_id);

            $this->authorize('viewAny', [ProjectUser::class, $project_id]);

        }
        catch (ModelNotFoundException $e){
            return response()->json([
                'success'=>false,
                'message'=>'Project Not found.'
            ], 404);
        }
        $members = $project->members()->get();

        $creator = $project->creator()->get()->first();

        $res = [
            'success'=>true,
            'project_id'=>$project->id,
            'project_creator'=>$creator,
            'members'=>$members
        ];

        return response()->json($res, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreProjectUserRequest $request
     * @return JsonResponse
     * @throws AuthorizationException if user is not the owner of the project
     */
    public function store(StoreProjectUserRequest $request): JsonResponse
    {
        $data = $request->safe()->only(
            ['username',
            'project_id',
            'can_create_tasks',
            'can_edit_tasks',
            'can_create_tags',
                'can_create_announcements'
            ]);

        $this->authorize('projectOwnerAction', [ProjectUser::class, $data['project_id']]);

        //get user by username
        $user = User::where('username',$data['username'])->first();

        //check if user already exists
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
     * @param UpdateProjectUserRequest $request - request with all data to update
     * @param int $id ProjectUser id
     * @return JsonResponse
     * @throws AuthorizationException if user is not owner of the project
     */
    public function update(UpdateProjectUserRequest $request, int $id): JsonResponse
    {
        $data = $request->safe()->only([
            'can_create_tasks',
            'can_edit_tasks',
            'can_create_tags',
            'can_create_announcements']);

        try {
            $member = ProjectUser::findOrFail($id);

            $this->authorize('projectOwnerAction', [ProjectUser::class, $member->project_id]);

            $member->update($data);

            $res = [
                'success'=>true,
                'member'=>$member
            ];

            return response()->json($res, 200);
        }
        //TODO: fix that the exception is not handled when a false id is passed
        catch(ModelNotFoundException $e){
            $res = [
                'success'=>false,
                'message'=> 'ProjectUser id not found.'
            ];
            response()->json($res,404);
        }

        return response()->json(['success'=>false, 'message'=> 'Unknown error.'],500);

    }

    /**
     * Remove the ProjectUser from the Project.
     *
     * @param int $id - ProjectUser id
     * @return JsonResponse
     * @throws AuthorizationException if the authenticated user is not the owner of the project
     */
    public function destroy(int $id): JsonResponse
    {
        $member = ProjectUser::find($id);
        if(!$member){
            return response()->json(['success'=>true,'message' => 'Member does not exist and therefore can not be deleted.'],404);
        }

        $this->authorize('projectOwnerAction', [ProjectUser::class, $member->project_id]);

        if($member->delete()){
            return response()->json(['success'=>true,'message'=>'Deleted.'],200);
        }
        return response()->json(['success'=>false],500);
    }

    /**
     * Remove the currently authenticated user from
     * the specified project.
     *
     * @param int $id - Project id
     * @return JsonResponse
     */
    public function leaveProject(int $id): JsonResponse
    {
        $project = ProjectUser::find($id);
        if(!$project){
            return response()->json(['success'=>false,'message' => 'Project does not exist.'],404);
        }

        $user = Auth::user();
        $member = ProjectUser::where('user_id',$user->id)->where('project_id',$id)->first();

        if(!$member){
            if($project->user_id == $user->id){
                return response()->json(['success'=>false,'message' => 'You are the owner of this project.'],404);
            }

            return response()->json(['success'=>false,'message' => 'You are not a member of this project.'],404);


        }

        if($member->delete()){
            return response()->json(['success'=>true,'message'=>'Successfully left the project.'],200);
        }

        return response()->json(['success'=>false],500);
    }
}
