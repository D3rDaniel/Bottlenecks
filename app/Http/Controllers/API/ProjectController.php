<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Exception;

class ProjectController extends Controller
{
    /**
     * Store a newly created project.
     *
     * @param StoreProjectRequest $request
     * @return JsonResponse
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {

        $data = $request->safe()->only(['title','description','due_date']);
        $data['creator_user_id']=Auth::id();

        $project = Project::create($data);

        if($project){
            $res = ['success'=>true, 'project'=>$project];
            $status = 201;
        }else{
            $res = ['success'=>false,'message'=>'Project could not be created'];
            $status = 500;
        }

        return response()->json($res, $status);

    }

    /**
     * Return the project specified by its id.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        $project = Project::with('creator')->find($id);

        if($project){
            try {
                $this->authorize('view', [$project]);
            }
            catch(\Exception $exception){
                if ($exception instanceof AuthorizationException) {
                    return response()->json([
                        'message' => 'Not authorized.'
                    ],403);
                }
            }


            $res = ['success'=>true,'project'=>$project];
            $status = 200;
        }
        else{
            $res = ['success'=>false, 'message'=>'Project not found.'];
            $status = 404;
        }
        return response()->json($res, $status);
    }

    /**
     * Update title, description and due_date of the project(id) in storage.
     *
     * @param UpdateProjectRequest $request
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function update(UpdateProjectRequest $request, $id): JsonResponse
    {

        $project = Project::find($id);
        $data = $request->safe()->only(['title','description','due_date']);

        if($project){
            $this->authorize('update',[$project]);
            $project->update($data);

            $res = ['success'=>true,'project'=>$project];
            $status = 200;
        }else{
            $res = ['success'=>false,'message'=>'Project could not be found'];
            $status = 404;
        }
        return response()->json($res,$status);
    }

    /**
     * Remove the specified project from storage.
     *
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy($id): JsonResponse
    {

        $project = Project::find($id);
        if(!$project){
            return response()->json(['success'=>false,'message' => 'Project not found.'],404);
        }

        $this->authorize('forceDelete',[$project]);

        if($project->delete()){
            return response()->json(['success'=>true,'message'=>'project deleted.'],200);
        }
        return response()->json(['success'=>false,'message'=>'Project could not be deleted.'],500);
    }

    /**
     * Set the projects completion date
     * to current date
     *
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function completeProject($id): JsonResponse
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['success' => false], 404);
        }

        $this->authorize('completeProject',[$project]);

        $date = today()->toDateString();
        $project->completion_date = $date;
        $project->save();

        return response()->json(['success'=>true,'project'=>$project], 200);
    }


    }

