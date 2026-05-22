<?php

use Illuminate\Support\Facades\Route;
use App\Jobs\SendDataInDatabase;
use App\Http\Controllers\Admin\AdminController;

// Route::get('/', function () {
//     dispatch(new SendDataInDatabase);
//     return view('welcome');
// });

Route::match(['get','post'],'/',[AdminController::class,'index'])->name('/');
