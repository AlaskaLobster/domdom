<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User; // Import the User model

class AuthController extends Controller
{
    public function logout(Request $request) {
        if ($request->user()) {
            Log::info('User logged out: ' . $request->user()->id);
        } else {
            Log::info('Logout attempt by unauthenticated user');
        }


        // Xóa phiên người dùng
        Auth::logout();

        // Trả về phản hồi JSON
        return response()->json(['message' => 'Đăng xuất thành công']);
    }
}
