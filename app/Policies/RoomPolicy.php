<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\Room;
use App\Models\User;
use http\Client\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class RoomPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user,  $project_id): Response|bool
    {
        return ($user->isMemberOfProject($project_id) || $user->isOwnerOfProject($project_id));
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Room $room): Response|bool
    {
        $project_id = $room->project_id;
        return ($user->isOwnerOfProject($project_id) || $user->isMemberOfProject($project_id));
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user ,int $project_id): Response|bool
    {
        if($user->isOwnerOfProject($project_id)){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Room $room): Response|bool
    {

        //check if the user is the owner of the project
       if ($user->isOwnerOfProject($room->project_id)){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Room $room): Response|bool
    {
        if ($user->isOwnerOfProject($room->project_id)){
            return true;
        }
        return false;
    }
}
