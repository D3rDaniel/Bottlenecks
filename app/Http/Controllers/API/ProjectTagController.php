<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;

class ProjectTagController extends Controller
{
    /**
     * Get all tags of the project.
     *
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function getTags($id): JsonResponse
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['success' => false,'message' => 'Project not found.'], 404);
        }

        $this->authorize('getTags',[$project]);

        $tags = $project->tags()->get();

        return response()->json(['success'=>true,'project_id'=>$project->id,'tags'=>$tags], 200);
    }
}
