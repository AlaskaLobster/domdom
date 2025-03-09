<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeacherController;

Route::post('/login', [TeacherController::class, 'login']); // Định nghĩa endpoint cho đăng nhập
Route::get('/api/teachers/info', [TeacherController::class, 'info']);
