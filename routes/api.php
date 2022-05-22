<?php

use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\ProjectTaskController;
use App\Http\Controllers\API\ProjectUserController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\UserProjectController;
use Illuminate\Support\Facades\Route;

//all tasks of a project /api/project/{id}/tasks
Route::apiResource('project.tasks', ProjectTaskController::class)->only('index');
//all projects of a user /api/user/{id}/projects
Route::apiResource('user.projects', UserProjectController::class)->only('index');

//ProjectUsers (Members)
Route::apiResource('project.members', ProjectUserController::class)->only(['index']);
//id = id of ProjectUser NOT the user
Route::delete('/project-member/{id}', [ProjectUserController::class,'destroy']);
Route::put('/project-member/{id}', [ProjectUserController::class,'update']);
//add user by username
Route::post('/project/{id}/add-new-user', [ProjectUserController::class,'store']);

//Project
Route::post('/project', [ProjectController::class, 'store']);
Route::get('/project/{id}', [ProjectController::class, 'show']);
Route::delete('/project/{id}', [ProjectController::class, 'destroy']);
Route::put('/project/{id}', [ProjectController::class, 'update']);
Route::put('/project/{id}/complete', [ProjectController::class, 'completeProject']);
Route::get('/project/{id}/tags',[ProjectController::class,'getTags']);

//Tasks
Route::apiResource('task', TaskController::class);
Route::get('task/showOpenByUserId/{user_id}', [TaskController::class,'showOpenByUserId']);
Route::get('task/showCompletedByUserId/{user_id}', [TaskController::class,'showCompletedByUserId']);
Route::put('task/{id}/complete', [TaskController::class,'completeTask']);

//Tags
Route::apiResource('/tag',\App\Http\Controllers\API\TagController::class)->only(['store','destroy']);

//User
Route::apiResource('user', \App\Http\Controllers\API\UserController::class);
Route::put('/user/{id}', [\App\Http\Controllers\API\UserController::class, 'update']);

//Room
Route::apiResource('room', \App\Http\Controllers\API\RoomController::class);
Route::put('/room/{id}', [\App\Http\Controllers\API\RoomController::class, 'update']);

//Booking
Route::apiResource('bookings', \App\Http\Controllers\API\BookingController::class);
Route::get('bookings/showByUserId/{user_id}', [\App\Http\Controllers\API\BookingController::class, 'showByUserId']);

//Announcements
Route::get('/announcements/showProjectUser/{project_id}/{user_id}', [\App\Http\Controllers\API\AnnouncementController::class, 'showProjectUser']);
Route::get('/announcements/showByUserId/{user_id}', [\App\Http\Controllers\API\AnnouncementController::class, 'showByUserId']);
Route::get('/announcements/project/{project_id}', [\App\Http\Controllers\API\AnnouncementController::class, 'show']);
Route::post('/announcements', [\App\Http\Controllers\API\AnnouncementController::class, 'store']);
Route::put('/announcements/{id}', [\App\Http\Controllers\API\AnnouncementController::class, 'update']);

