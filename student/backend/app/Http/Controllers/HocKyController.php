<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\HocKy; // Thêm dòng này để sử dụng model HocKy
class HocKyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(HocKy::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            // Thêm các trường khác nếu cần
        ]);

        $hocKy = HocKy::create($validatedData);
        return response()->json($hocKy, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hocKy = HocKy::findOrFail($id);
        return response()->json($hocKy, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $hocKy = HocKy::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            // Thêm các trường khác nếu cần
        ]);

        $hocKy->update($validatedData);
        return response()->json($hocKy, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $hocKy = HocKy::findOrFail($id);
        $hocKy->delete();
        return response()->json(null, 204);
    }
}
