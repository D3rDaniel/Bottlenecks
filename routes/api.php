<?php

use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\ProjectTaskController;
use App\Http\Controllers\API\ProjectUserController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\UserProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//all tasks of a project /api/project/{id}/tasks
Route::apiResource('project.tasks', ProjectTaskController::class)->only('index');
//all projects of a user /api/user/{id}/projects
Route::apiResource('user.projects', UserProjectController::class)->only('index');

Route::apiResource('project.members', ProjectUserController::class)->only(['index', 'store']);
//id = id of ProjectUser NOT the user
Route::delete('/project-member/{id}', [ProjectUserController::class,'destroy']);
Route::put('/project-member/{id}', [ProjectUserController::class,'update']);

Route::post('/project', [ProjectController::class, 'store']);
Route::get('/project/{id}', [ProjectController::class, 'show']);
Route::delete('/project/{id}', [ProjectController::class, 'destroy']);
Route::put('/project/{id}', [ProjectController::class, 'update']);
Route::put('/project/{id}/complete', [ProjectController::class, 'completeProject']);

Route::delete('/task/{id}', [TaskController::class, 'destroy']);
