<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class UserProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id)
    {
        //get all projects where a user is either the owner or a member
        $projects = User::find($id)->projects()->with('creator')->get();

        //add the created Projects of the user to the projects
        $createdProjects = User::find($id)->createdProjects()->get();

        $projects = $projects->merge($createdProjects);

        //check if projects are empty
        if($projects->isEmpty()){
            return response()->json(['message'=>'no projects found'], 404);
        }

        foreach ($projects as $project) {
        //TODO eager loading umgehen -> user wieder entfernen wenn er creator ist
            if ($project->creator->id == $id) {
                $project->is_creator = true;
            } else {
                $project->is_creator = false;
            }
            $project->progress_percentage = $project->calculateProgress();
        }

        return response()->json($projects);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
