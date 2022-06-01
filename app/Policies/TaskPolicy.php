<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the tasks
     * depending on the project.
     *
     * @param User $user
     * @param int $project_id
     * @return Response|bool
     */
    public function viewAny(User $user, $project_id)
    {
        return ($user->isMemberOfProject($project_id) || $user->isOwnerOfProject($project_id));
    }

    /**
     * Determine whether the user is the
     * owner of the project or the user is member of the project
     * in order to view the task.
     *
     * @param User $user
     * @param Task $task
     * @return bool
     */
    public function view(User $user, Task $task): bool
    {
        $project_id = $task->project_id;
        return ($user->isOwnerOfProject($project_id) || $user->isMemberOfProject($project_id));
    }

    /**
     * Determine whether the user can create tasks
     * within the project with the specified project_id.
     *
     * @param User $user
     * @param   int $project_id
     * @return Response|bool
     */
    public function create(User $user, int $project_id): Response|bool
    {
        if($user->isOwnerOfProject($project_id)){
            return true;
        }
        elseif ($user->isMemberOfProject($project_id)){
            $user_project_information = $user->getUserProjectInformation($project_id);
                return ($user_project_information->can_create_tasks);
        }
            return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Task $task
     * @return Response|bool
     */
    public function update(User $user, Task $task): Response|bool
    {
        //check if the user is the owner of the task
        if($user->id == $task->creator_user_id){
            return true;
        }
        elseif ($user->isMemberOfProject($task->project_id)){
            $user_project_information = $user->getUserProjectInformation($task->project_id);
            if ($user_project_information->can_edit_tasks){
                return true;
            }
            else{
                return $this->deny('User is not allowed to edit tasks.');
            }
        }
        //check if the user is the owner of the project
        elseif ($user->isOwnerOfProject($task->project_id)){
            return true;
        }
        return false;
    }



    /**
     * Determine whether the user is the creator of the task
     * or the project owner in order to delete the model.
     *
     * @param User $user
     * @param Task $task
     * @return bool
     */
    public function forceDelete(User $user, Task $task)
    {
        return ($user->isOwnerOfProject($task->project_id) || $user->id == $task->creator_user_id);
    }

    /**
     * Determine whether the user is the creator of the task
     * or the project owner in order to delete the model.
     *
     * @param User $user
     * @param Task $task
     * @return Response|bool
     */
    public function complete(User $user, Task $task)
    {
      if (($user->isOwnerOfProject($task->project_id)) || ($user->id == $task->creator_user_id) || ($user->id == $task->assignee_user_id)){
          return true;
      }
        return $this->deny('User is neither owner of the project, nor the creator or the assignee of the task.');
    }
}
