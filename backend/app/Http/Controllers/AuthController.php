<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User; // Import the User model

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = new User();
        $user->username = $request->username;
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(['success' => true, 'message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return response()->json(['success' => true, 'role' => Auth::user()->role], 200);
        }

        return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout(); // Đăng xuất người dùng
        return response()->json(['message' => 'Đăng xuất thành công.'], 200);
    }
}
