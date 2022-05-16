<?php

use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\ProjectTaskController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\UserProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//all tasks of a project /api/project/{id}/tasks
Route::apiResource('project.tasks', ProjectTaskController::class);
//all projects of a user /api/user/{id}/projects
Route::apiResource('user.projects', UserProjectController::class);

Route::post('/project', [ProjectController::class, 'store']);
Route::delete('/project/{id}', [ProjectController::class, 'destroy']);
Route::put('/project/{id}', [ProjectController::class, 'update']);

Route::delete('/task/{id}', [TaskController::class, 'destroy']);
