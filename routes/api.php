<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StudentController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::post('upload-pic', [StudentController::class, 'postPicture']); //->middleware('api']);
    Route::post('login', [AdminController::class, 'login']);
    Route::post('register', [AdminController::class, 'register']); //->middleware('auth:api']);
    //Dashboard
    Route::post('user', [AdminController::class, 'user']);

    Route::group(['prefix' => 'admin'], function () {
        Route::get('news', function () {
            return 'Welcome';
        });
        // Route::get('login', function()
        // {
        //     return response()->json(['error'=>'Unauthorised','message'=>'login first'], 401);
        // })->name('login']);
        Route::post('users', [AdminController::class, 'users']);
        Route::post('logout', [AdminController::class, 'logout']);
    });

    Route::group(array('prefix' => 'teacher'), function () {

        Route::resource("/", TeacherController::class);
        Route::get('login', [TeacherController::class, 'index']);
        Route::post('login', [TeacherController::class, 'postLogin']);
        Route::get('register', [TeacherController::class, 'getRegister']);
        Route::post('register', [TeacherController::class, 'postRegister']);
        Route::get('logout', [TeacherController::class, 'getLogout']);
        //Student main route
        Route::get('profile', [TeacherController::class, 'getProfile']);
        Route::get('payment', [TeacherController::class, 'getPayment']);
        Route::get('edit-profile/{teacher}', [TeacherController::class, 'getEditProfile']);
        Route::post('edit-profile', [TeacherController::class, 'postEditProfile']);
        //Students and result manager

        Route::get('result', [TeacherController::class, 'resultIndex']);
        Route::post('result', [TeacherController::class, 'postResult']);
        Route::get('result/{group}/{term}', [TeacherController::class, 'getClassResult']);
        Route::post('view-result-rdr', [TeacherController::class, 'resultRdr']);

        Route::post('result/{StudentClass}/{term}', [TeacherController::class, 'postClassResult']);

        Route::post('view-result', [TeacherController::class, 'postViewResult']);
        Route::post('create-result', [TeacherController::class, 'postCreateResult']);
        Route::post('save-results', [TeacherController::class, 'postSaveTeacherResult']);
    });

    Route::group(array('prefix' => 'student'), function () {

        Route::get('login', [StudentController::class, 'getIndex']);
        Route::post('login', [StudentController::class, 'postLogin']);
        Route::post('{student}', [StudentController::class, 'getStudent']);
        Route::get('register', [StudentController::class, 'getRegister']);
        Route::get('logout', [StudentController::class, 'getLogout']);
        //Student main route
        Route::get('profile', [StudentController::class, 'getProfile']);
        Route::get('payment', [StudentController::class, 'getPayment']);
        Route::get('view-result', [StudentController::class, 'getViewResult']);
        Route::get('edit-profile/{student}', [StudentController::class, 'getEditProfile']);
        Route::post('edit-profile', [StudentController::class, 'postEditProfile']);
        Route::post('register', [StudentController::class, 'postRegister']);
        Route::resource("/", StudentController::class);
    });

    Route::group(['prefix' => 'guardian'], function () {

        Route::post('register', [GuardianController::class, 'register']);
        Route::post('students', [GuardianController::class, 'students']);
        Route::get('school/{school}', [GuardianController::class, 'getSchool']);

        Route::post('logout', [GuardianController::class, 'logout']);

        //Dashboard
        Route::post('parent', [GuardianController::class, 'parent']);
        Route::get('child/{student}', [GuardianController::class, 'getChild']);
        Route::get('sessions-from/{session}', [GuardianController::class, 'getSessions']);
    });
});
