<?php namespace App\Http\Controllers;

use App\Http\Controllers\Auth\GuardianAuth;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use App\Student;
use App\Session;

class GuardianController extends Controller {

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

    use GuardianAuth;

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

        
        $this->middleware('guardian_auth', [
           'except' => ['register', 'login']
        ]);
        

    }
    /** 
     *  
     * 
     * @return child
     */ 
    public function getChild(Request $request, Student $student) 
    {        
        $student->user;
        $student->current_session =Session::active();
        $student->session;
        $student->results->map(function($result)
        {
            return $result->session;
        });
        $student->results->map(function($result)
        {
            return $result->subject;
        });
        $student->subjects = \App\Subject::all();
        return response()->json(['child'=>$student], $this-> successStatus); 
    } 
    /** 
     *  
     * 
     * @return child
     */ 
    public function getSessions(Request $request, Session $session) 
    { 
        $sessions = Session::where('id','>=',$session->id)->get();
        return response()->json(['sessions'=>$sessions]);
    }       
}
