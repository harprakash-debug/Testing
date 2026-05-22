<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use DB;
use Illuminate\Support\Facades\Cache;

class AdminController extends Controller
{
    public function index(Request $request){
        DB::enableQueryLog();
        if (empty(cache::get('response'))) {
            return response()->json(['data' => 'error'], 404);
        }
        return response()->json(['data' => cache::get('response'), 'timing' => DB::getQueryLog()]);
    }
}
