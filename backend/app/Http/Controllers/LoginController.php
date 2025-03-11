<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        // Use Laravel's Auth for user authentication
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $role = $user->role; // Assuming role is a field in your users table
            $redirect = $this->getDashboardRoute($role);
            
            return response()->json([
                'message' => 'Đăng nhập thành công!',
                'redirect' => $redirect,
                'role' => $role,
            ], 200);
        }


        if (isset($users[$credentials['username']]) && 
            password_verify($credentials['password'], $users[$credentials['username']]['password'])) {

            
            $role = $users[$credentials['username']]['role'];
            $redirect = $this->getDashboardRoute($role);
            
            // Generate JWT token
            $token = auth()->attempt($credentials);
            
            return response()->json([
                'message' => 'Đăng nhập thành công!',
                'redirect' => $redirect,
                'role' => $role,
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ], 200);

        }

        return response()->json(['message' => 'Thông tin đăng nhập không chính xác.'], 401);









    }

    private function getDashboardRoute($role)
    {
        switch ($role) {
            case 'admin':
                return '/admin-dashboard';
            case 'teacher':
                return '/teacher-dashboard';
            case 'student':
                return '/student-dashboard';
            default:
                return '/';
        }


    }
}
