<?php

use App\Http\Controllers\API\ClientController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/clients', [ClientController::class, 'index']);
Route::post('/add-client', [ClientController::class, 'store']);
Route::get('/edit-client/{id}', [ClientController::class, 'edit']);
Route::put('/update-client/{id}', [ClientController::class, 'update']);
Route::delete('/delete-client/{id}', [ClientController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
