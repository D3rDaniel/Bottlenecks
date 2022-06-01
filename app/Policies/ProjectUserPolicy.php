<?php

namespace App\Policies;

use App\Models\ProjectUser;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ProjectUserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param User $user
     * @return Response|bool
     */
    public function viewAny(User $user, int $project_id)
    {
        return ($user->isMemberOfProject($project_id) || $user->isOwnerOfProject($project_id));
    }


    /**
     * Determine whether the user id the creator/owner of the project.
     *
     * @param User $user
     * @return Response|bool
     */
    public function projectOwnerAction(User $user, $project_id)
    {
        if  ($user->isOwnerOfProject($project_id)){
         return true;
        }
        return $this->deny('User is not the creator/owner of the project.');
    }


}
