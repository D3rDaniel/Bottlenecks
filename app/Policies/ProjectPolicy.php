<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the project.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Project $project)
    {
        return $this->isCreatorOrMember($user,$project);
    }


    /**
     * Determine whether the user can update the project.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Project $project)
    {
        //Only the Project creator can update the project
        return ($project->creator->id == $user->id);
    }


    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Project $project)
    {
        return ($project->creator->id == $user->id);
    }

    /**
     * Determine whether the user can complete the project.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function completeProject(User $user, Project $project)
    {
        return ($project->creator->id == $user->id);
    }

    /**
     * Determine whether the user can see the projects tags.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function getTags(User $user, Project $project)
    {
        return $this->isCreatorOrMember($user,$project);
    }

    /**
     * Determine whether the user is a member or
     * the owner/creator of the project.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Project  $project
     * @return bool
     */
    private function isCreatorOrMember(User $user, Project $project): bool
    {
        $res = false;
        //check if user is the creator
        if($project->creator->id == $user->id){
            $res = true;
        }
        else{
            //check if user is project member
            $members = $project->members()->get();
            $res = $members->contains('id',$user->id);
        }
        return $res;
    }
}


