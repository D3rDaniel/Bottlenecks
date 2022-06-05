<?php

namespace App\Policies;

use App\Models\Announcement;
use App\Models\User;
use http\Client\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class AnnouncementPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user, int $project_id): Response|bool
    {
        return ($user->isMemberOfProject($project_id) || $user->isOwnerOfProject($project_id));
    }


    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Announcement  $announcement
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Announcement $announcement): \Illuminate\Auth\Access\Response|bool
    {
        $project_id = $announcement->project_id;
        return ($user->isOwnerOfProject($project_id) || $user->isMemberOfProject($project_id));
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user, int $project_id): \Illuminate\Auth\Access\Response|bool
    {
        if($user->isOwnerOfProject($project_id)){
            return true;
        }
        elseif ($user->isMemberOfProject($project_id)){
            $user_project_information = $user->getUserProjectInformation($project_id);
            return ($user_project_information->can_create_announcements);
        }
        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Announcement  $announcement
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Announcement $announcement): \Illuminate\Auth\Access\Response|bool
    {
        //check if the user is the owner of the annoncement
        if($user->id == $announcement->user_id){
            return true;
        }
        //check if the user is the owner of the project
        elseif ($user->isOwnerOfProject($announcement->project_id)){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Announcement  $announcement
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Announcement $announcement)
    {
        //check if the user is the owner of the task
        if($user->id == $announcement->user_id){
            return true;
        }
        //check if the user is the owner of the project
        elseif ($user->isOwnerOfProject($announcement->project_id)){
            return true;
        }
        return false;
    }
}
