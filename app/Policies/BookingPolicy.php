<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use http\Client\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class BookingPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user, int $room_id): Response|bool
    {
        $room = Room::findOrFail($room_id);
        $project_id = $room->project()->get()->id;
        return ($user->isMemberOfProject($project_id) || $user->isOwnerOfProject($project_id));
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Booking $booking): Response|bool
    {
        $project_id = $booking->room()->project()->get()->id;
        return ($user->isOwnerOfProject($project_id) || $user->isMemberOfProject($project_id));
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user,int $room_id):Response|bool
    {
        //TODO: Fix ID Bug
        $room = Room::findOrFail($room_id);
        $project_id = $room->project()->get('id')->pluck('id')->first();

        if($user->isOwnerOfProject($project_id)){
            return true;
        }
        elseif ($user->isMemberOfProject($project_id)){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Booking $booking):Response|bool
    {
        //check if the user is the owner of the booking
        if($user->id == $booking->user_id){
            return true;
        }
        //check if the user is the owner of the project
        elseif ($user->isOwnerOfProject($booking->room()->project()->get()->id)){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Booking $booking):Response|bool
    {
        //check if the user is the owner of the booking
        if($user->id == $booking->user_id){
            return true;
        }
        //check if the user is the owner of the project
        elseif ($user->isOwnerOfProject($booking->room()->project()->get()->id)){
            return true;
        }
        return false;
    }
}
