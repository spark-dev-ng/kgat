<?php namespace App\Http\Controllers;

use App\Http\Controllers\Auth\AdminAuth;
use Illuminate\Contracts\Auth\Guard;

class AdminController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Admin Controller
    |--------------------------------------------------------------------------
    |
    | This controller renders the admin login page.
    | It authenticates administrative users
    | It renders the administrative dashboard on successful authentication.
    |
    */

    //Admin Login and Registration Trait

    use AdminAuth;

    protected $redirectTo = '/';
    /**
     * Create a new authentication controller instance.
     *
     * @param  \Illuminate\Contracts\Auth\Guard  $auth
     * @param  \Illuminate\Contracts\Auth\Registrar  $registrar
     * @return void
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;

        
        $this->middleware('admin_auth', [
           'except' => ['register', 'login','user']
        ]);
        

    }

}
