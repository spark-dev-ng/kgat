<?php namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\User; 
use App\Student; 
use App\Guardian; 
use Illuminate\Support\Facades\Auth; 
use Validator;

trait GuardianAuth {

    public $successStatus = 200;
    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(){ 
        $notAllowed = response()->json(['error'=>'Unauthorised'], 401); 
        if(Auth::attempt(['username' => request('username'), 'password' => request('password')])){ 
            $parent = Auth::user(); 
            if($parent->userable_type !=='App\Guardian'){
                return $notAllowed;
            }
            $success['token'] =  $parent->createToken('MyApp')-> accessToken; 
            return response()->json(['success' => $success], $this-> successStatus); 
        } 
        else{ 
            return $notAllowed;
        } 
    } 
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
            'c_password' => 'required|same:password', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all();  
        $input['userable_type'] =  'App\Guardian';
       
        if($profile = Guardian::create($input)){
            $input['userable_id'] = $profile->id;
            $parent = User::create($input);            
            $parent['token'] =  $parent->createToken('MyApp')->accessToken;
            return response()->json(['success'=>true,'parent'=>$parent],$this-> successStatus);
        }
        return response()->json(['success'=>false,'msg'=>'Fail to create profile'], 401); 
    }
    /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function parent() 
    { 
        $parent = Auth::user(); 
        $parent->userable;
        // $parent->userable->students;
        return response()->json(['parent' => $parent], $this-> successStatus); 
    } 

    /** 
     *  
     * 
     * @return Array(Users)
     */ 
    public function students() 
    { 
        $students = Auth::user()->userable->students;

        $students->map(function($student)
        {
            $student->userable;
            return $student->class;
        }); 
        
        return response()->json(['students'=>$students], $this-> successStatus); 
    } 

    /**
     * Log the user out of the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        $this->auth->logout();

        return null;
    }

}