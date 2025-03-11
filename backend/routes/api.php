<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeacherController; // Import the TeacherController
use App\Http\Controllers\HocSinhController; // Import the HocSinhController


Route::post('/login', [AuthController::class, 'login']); // Define the login route
Route::get('/users', [AuthController::class, 'getAllUsers']); // Route to get all users

Route::get('/hoc_sinhs', [HocSinhController::class, 'index']); // Route to get all students
Route::post('/hoc_sinhs', [HocSinhController::class, 'store']); // Route to create a new student
Route::get('/hoc_sinhs/{id}', [HocSinhController::class, 'show']); // Route to get a specific student
Route::put('/hoc_sinhs/{id}', [HocSinhController::class, 'update']); // Route to update a specific student
Route::delete('/hoc_sinhs/{id}', [HocSinhController::class, 'destroy']); // Route to delete a specific student



