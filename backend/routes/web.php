<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/tables', function () {
    return DB::select('SHOW TABLES');
});

Route::get('/welcome', function () {
    return response()->json(['message' => 'Welcome to the Laravel API Service!']);
});

Route::post('/login', [\App\Http\Controllers\LoginController::class, 'login']);

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index']);
Route::get('/api/students', [\App\Http\Controllers\HocSinhController::class, 'index']);
Route::get('/api/classes', [\App\Http\Controllers\LopController::class, 'index']);
Route::get('/api/subjects', [\App\Http\Controllers\MonHocController::class, 'index']);
Route::get('/api/academic-levels', [\App\Http\Controllers\HocLucController::class, 'index']);
Route::get('/api/grade-levels', [\App\Http\Controllers\KhoiLopController::class, 'index']);
Route::get('/api/academic-years', [\App\Http\Controllers\NamHocController::class, 'index']);

Route::post('/login', [\App\Http\Controllers\LoginController::class, 'login']);
Route::apiResource('hocsinh', \App\Http\Controllers\HocSinhController::class);
Route::apiResource('lop', \App\Http\Controllers\LopController::class);
Route::apiResource('monhoc', \App\Http\Controllers\MonHocController::class);
Route::apiResource('hocluc', \App\Http\Controllers\HocLucController::class);
Route::apiResource('khoilop', \App\Http\Controllers\KhoiLopController::class);
Route::apiResource('lop', \App\Http\Controllers\LopController::class);
Route::apiResource('monhoc', \App\Http\Controllers\MonHocController::class);
Route::apiResource('namhoc', \App\Http\Controllers\NamHocController::class);
