<?php

use App\Http\Controllers\API\ProjectTaskController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\UserProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//all tasks of a project /api/project/{id}/tasks
Route::apiResource('project.tasks', ProjectTaskController::class);
//all projects of a user /api/user/{id}/projects
Route::apiResource('user.projects', UserProjectController::class);


Route::delete('/task/{id}', [TaskController::class, 'destroy']);
