<?php

use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\ProjectOverviewController;
use App\Http\Controllers\API\ProjectTaskController;
use App\Http\Controllers\API\ProjectUserController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\UserProjectController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
//Public routes
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::get('/statuses/all',[\App\Http\Controllers\API\StatusController::class,'index']);
Route::get('/priorities/all',[\App\Http\Controllers\API\PriorityController::class,'index']);

//Protected routes
 Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout',[AuthController::class,'logout']);
    //all tasks of a project /api/project/{id}/tasks
    Route::apiResource('project.tasks', ProjectTaskController::class)->only('index');
    //all rooms of a project /api/project/{id}/rooms
    Route::apiResource('project.rooms', \App\Http\Controllers\API\ProjectRoomController::class)->only('index');
//all projects of a user /api/user/{id}/projects
    Route::apiResource('user.projects', UserProjectController::class)->only('index');
    //ProjectUsers (Members)
    Route::apiResource('project.members', ProjectUserController::class)->only(['index']);
//id = id of ProjectUser NOT the user
    Route::delete('/project-member/{id}', [ProjectUserController::class,'destroy']);
    Route::put('/project-member/{id}', [ProjectUserController::class,'update']);
//add user by username
    Route::post('/project/add-new-user', [ProjectUserController::class,'store']);

    //leave project
    Route::delete('/project/{id}/leave', [ProjectUserController::class,'leaveProject']);

//Project
    Route::post('/project', [ProjectController::class, 'store']);
    Route::get('/project/{id}', [ProjectController::class, 'show']);
    Route::delete('/project/{id}', [ProjectController::class, 'destroy']);
    Route::put('/project/{id}', [ProjectController::class, 'update']);
    Route::put('/project/{id}/complete', [ProjectController::class, 'completeProject']);
    Route::get('/project/{id}/tags',[ProjectController::class,'getTags']);

//Project Overview
    Route::get('project/{id}/overview',[ProjectOverviewController::class,'show']);
//Tasks
    Route::apiResource('task', TaskController::class);
    Route::put('task/{id}/complete', [TaskController::class,'completeTask']);

//Tags
    Route::apiResource('/tag',\App\Http\Controllers\API\TagController::class)->only(['store','destroy']);

//User
    Route::apiResource('user', \App\Http\Controllers\API\UserController::class);
    Route::put('/user/{id}', [\App\Http\Controllers\API\UserController::class, 'update']);
    Route::get('/user/tasks/{slug}',[\App\Http\Controllers\API\TaskUserController::class,'getTasks']);

//Room
    Route::apiResource('room', \App\Http\Controllers\API\RoomController::class);
    Route::get('/user/{id}', [\App\Http\Controllers\API\UserController::class, 'update']);
    Route::put('/room/{id}', [\App\Http\Controllers\API\RoomController::class, 'update']);

//Booking
    Route::apiResource('bookings', \App\Http\Controllers\API\BookingController::class);
    Route::get('/user/{user_id}/bookings', [\App\Http\Controllers\API\UserBookingController::class,'show']);
    Route::get('/room/{room_id}/bookings', [\App\Http\Controllers\API\RoomBookingController::class,'show']);

//Announcements
    Route::apiResource('/announcements',\App\Http\Controllers\API\AnnouncementController::class);
    Route::get('/announcements/user/{user_id}',[\App\Http\Controllers\API\AnnouncementUserController::class,'show']);
    Route::get('/project/{project_id}/user/{user_id}/announcements', [\App\Http\Controllers\API\ProjectUserAnnouncementController::class, 'show']);
    Route::get('/user/{user_id}/announcements', [\App\Http\Controllers\API\UserAnnouncementController::class,'show']);
    Route::get('/project/{project_id}/announcements', [\App\Http\Controllers\API\ProjectAnnouncementController::class, 'show']);
}) ;


