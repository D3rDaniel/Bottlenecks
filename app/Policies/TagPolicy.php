<?php

namespace App\Policies;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TagPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create tags
     * for the project with the specified id.
     *
     * @param User $user
     * @param $project_id
     * @return Response|bool
     */
    public function create(User $user, $project_id): Response|bool
    {
        if($user->isOwnerOfProject($project_id)){
            return true;
        }
        elseif ($user->isMemberOfProject($project_id)){
            $user_project_information = $user->getUserProjectInformation($project_id);
            return ($user_project_information->can_create_tags);
        }
        return false;
    }



    /**
     * Determine whether the user can delete the tag.
     * (Must be owner of project)
     *
     * @param User $user
     * @param Tag $tag
     * @return bool
     */
    public function delete(User $user, Tag $tag): bool
    {
        return ($user->isOwnerOfProject($tag->project_id));
    }


}
