<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MonHoc; // Giả sử bạn có model MonHoc để xác thực

class MonHocController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(MonHoc::all(), 200);
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

        $monHoc = MonHoc::create($validatedData);
        return response()->json($monHoc, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $monHoc = MonHoc::findOrFail($id);
        return response()->json($monHoc, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $monHoc = MonHoc::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            // Thêm các trường khác nếu cần
        ]);

        $monHoc->update($validatedData);
        return response()->json($monHoc, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $monHoc = MonHoc::findOrFail($id);
        $monHoc->delete();
        return response()->json(null, 204);
    }
}
