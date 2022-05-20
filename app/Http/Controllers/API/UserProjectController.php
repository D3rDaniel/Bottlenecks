<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
class UserProjectController extends Controller
{
    /**
     * Return a listing of the projects the
     * user either created or is a member of.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json(['success'=>false,'message'=>'User not found.'], 404);
        }

        $projectsWhereMember = $user ->projectsWhereMember()->with('creator')->get();

        $createdProjects = $user ->createdProjects()->get();


        if($projectsWhereMember->isEmpty() && $createdProjects->isEmpty()){
            return response()->json(['success'=>true,'message'=>'No projects found for this user.'], 404);
        }

        foreach ($projectsWhereMember as $project) {
            $project->progress_percentage = $project->calculateProgress();
        }

        foreach ($createdProjects as $project) {
            $project->progress_percentage = $project->calculateProgress();
        }

        $res = [
            'success'=>true,
            'projects_created'=>$createdProjects,
            'project-member_of'=> $projectsWhereMember
        ];

        return response()->json($res,200);
    }
}
