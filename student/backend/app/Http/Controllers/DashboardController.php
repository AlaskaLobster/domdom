<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return view('dashboard'); // Đảm bảo rằng bạn có view 'dashboard.blade.php' trong thư mục resources/views
    }
}
