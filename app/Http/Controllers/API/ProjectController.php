<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Store a newly created project in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->safe()->only(['title','description','due_date','creator_user_id']);

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
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $project = Project::with('creator')->find($id);

        if($project){
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
     * Update title, description and due_date of resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateProjectRequest $request, $id)
    {
        $data = $request->safe()->only(['title','description','due_date']);
        $project = Project::find($id);

        if($project){
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $project = Project::find($id);
        if(!$project){
            return response()->json(['success'=>false,'message' => 'Project not found'],404);
        }
        if($project->delete()){
            return response()->json(['success'=>true],200);
        }
        return response()->json(['success'=>false],500);
    }

    /**
     * Set the projects completion date
     * to current date
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function completeProject($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['success' => false], 404);
        }
        $date = today()->toDateString();
        $project->completion_date = $date;
        $project->save();

        return response()->json(['success'=>true,'project'=>$project], 200);
    }
    }

