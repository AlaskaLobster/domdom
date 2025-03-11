<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lop; // Giả sử bạn có model Lop để xác thực

class LopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Lop::all(), 200);
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

        $lop = Lop::create($validatedData);
        return response()->json($lop, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $lop = Lop::findOrFail($id);
        return response()->json($lop, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $lop = Lop::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            // Thêm các trường khác nếu cần
        ]);

        $lop->update($validatedData);
        return response()->json($lop, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lop = Lop::findOrFail($id);
        $lop->delete();
        return response()->json(null, 204);
    }
}
