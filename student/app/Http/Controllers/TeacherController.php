<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            // Đăng nhập thành công
            $user = Auth::user();
            return response()->json(['success' => true, 'role' => $user->role]);
        }

        // Đăng nhập không thành công
        return response()->json(['success' => false, 'message' => 'Tài khoản hoặc mật khẩu không đúng.']);
    }
}
