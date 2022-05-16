<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectStoreRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProjectStoreRequest $request)
    {
        $fields=$request->validated();

        $project = Project::create(
            [
                'title' => $fields['title'],
                'description' => $fields['description'],
                'creator_user_id' => $fields['creator_user_id'],
                'due_date' => $fields['due_date']
            ]
        );

        if($project){
            return response()->json($project,200);
        }else{
            return response()->json(['success'=>false,'message'=>'Project could not be created'],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        //TODO: verify request (especially dates)

        $project = Project::find($id);
        if($project){
            $project->update($request->all());
            //TODO: not manually
            if($request->has('completion_date')){
                $project->completion_date = $request->completion_date;
            }
            return response()->json($project,200);
        }else{
            return response()->json(['success'=>false,'message'=>'Project could not be found'],404);
        }
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
            return response()->json(['message' => 'Project not found'],404);
        }
        if($project->delete()){
            return response()->json(['deleted'=>true],200);
        }
        return response()->json(['deleted'=>false],404);
    }
}
