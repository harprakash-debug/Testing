<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $users = User::paginate(16);
        return response()->json(['data' => $users]);
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validate->fails()) {
            return response()->json(['success' => false, 'message' => $validate->errors()]);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json(['success' => true, 'message' => 'user Created Successfully']);
    }

    public function show(Category $category)
    {
        return response()->json($category);
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
        ]);

        $category->update($data);

        return response()->json($category);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (isset($user)) {
            $user->delete();
            return response()->json(['success' => true, 'message' => 'record successfully deleted']);
        }
        return response()->json(['success' => false, 'message' => 'Please try again this record not exist']);
    }
}
