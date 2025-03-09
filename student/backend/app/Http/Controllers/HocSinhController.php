<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\HocSinh; // Thêm dòng này để sử dụng model HocSinh

class HocSinhController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(HocSinh::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            // Thêm các trường khác nếu cần
        ]);

        $hocSinh = HocSinh::create($validatedData);
        return response()->json($hocSinh, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hocSinh = HocSinh::findOrFail($id);
        return response()->json($hocSinh, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $hocSinh = HocSinh::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'age' => 'integer',
            // Thêm các trường khác nếu cần
        ]);

        $hocSinh->update($validatedData);
        return response()->json($hocSinh, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $hocSinh = HocSinh::findOrFail($id);
        $hocSinh->delete();
        return response()->json(null, 204);
    }
}
