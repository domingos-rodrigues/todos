<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Nette\Schema\ValidationException;
use App\Http\Controllers\API\AuthController;
use Todos\Application\Controllers\TodoController;
use Todos\Application\Controllers\ProjectController;
use Todos\Application\Controllers\DashboardController;

//Controllers\TodoController;
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

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function (){

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('logout', //[AuthController::class, 'logout']);
        function (Request $request){
            auth()->guard('api')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json(null, 200);
    });

    Route::post('dashboard', [DashboardController::class, 'index']);
    Route::get('project/{id}/all', [DashboardController::class, 'index']);

    Route::post('project/{user_id}/create', [ProjectController::class, 'store'])
        ->where(['user_id' => '[0-9]+']);
    Route::get('project/{id}', [ProjectController::class, 'show'])
        ->where(['id' => '[0-9]+']);
    Route::get('project/edit/{id}', [ProjectController::class, 'update'])
        ->where(['id' => '[0-9]+']);
    Route::get('project/delete/{id}', [ProjectController::class, 'destroy'])
        ->where(['id' => '[0-9]+']);

//    Route::resources(['todos' => TodoController::class]);
    Route::get('todos/{id?}', [TodoController::class, 'index'])
        ->where(['id' => '[0-9]+']);
    Route::post('todo/endTask/{id}', [TodoController::class, 'endTask'])
        ->where(['id' => '[0-9]+']);
    Route::post('todo/delete/{id}', [TodoController::class, 'destroy'])
        ->where(['id' => '[0-9]+']);
    Route::post('todo/newTask', [TodoController::class, 'store']);
    Route::post('todo/edit/{id}', [TodoController::class, 'update'])
        ->where(['id' => '[0-9]+']);


});



