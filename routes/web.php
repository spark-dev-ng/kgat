<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/{path?}', function ($path = null) {
    return view('welcome');
})->where('path', '.*');

Route::get('/{path?}', function($path = null){ 

 return view('welcome');
});
Route::get('/{path}/{any?}', function () {
    return view('welcome');
});
Route::get('/{path?}/{any?}/{s?}/{a?}/', function () {
    return view('welcome');
});
