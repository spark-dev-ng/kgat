<?php namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\User; 
use App\Admin;
use App\Guardian;
use App\Http\Requests\LoginRequest;
use App\Student;
use App\ClassGroup;
use App\StudentClass;
use App\Teacher;
use Illuminate\Support\Facades\Auth; 
use Validator;

trait AdminAuth {

    public $successStatus = 200;
    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(LoginRequest $req){ 
        // dd($req);
        if(Auth::attempt($req->only(['username','password']))){ 
            $user = Auth::user(); 
            $token =  $user->createToken('token')-> plainTextToken; 
            $user->token = $token;
            $cookie = cookie('jwt',$token,(60*20)*120);
            $user->userable;
            return response(['success' =>true,'data'=>['user'=>$user,'token'=>$token]], $this-> successStatus)->withCookie($cookie); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    } 
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        // dd($request);
        $validator = Validator::make($request->all(), [ 
            'email' => 'required|email', 
            'password' => 'required', 
            'c_password' => 'required|same:password', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all(); 
        $type = $request->type;
        switch ($type) {
            case 'Admin':
                $input['userable_type'] =  'App\Admin';
                if($profile = Admin::create($input)){
                    $input['userable_id'] = $profile->id;
                }
                break;
            case 'Parent':
                $input['userable_type'] =  'App\Guardian';
                if($profile = Guardian::create($input)){
                    $input['userable_id'] = $profile->id;
                }
                break;
            case 'Teacher':
                $input['userable_type'] =  'App\Teacher';
                if($profile = Teacher::create($input)){
                    $input['userable_id'] = $profile->id;
                }
                break;            
            default:
            $input['userable_type'] =  'App\Student';
            $code = ClassGroup::where('name',$request['school'])->get();
            $cls = StudentClass::where('name',$request['class'])->get();
        //    dd(ClassGroup::where('name','Nursery')->take(1)->get());
            $count = (Student::where('id','>',1)->count()+1);
            if($count<10){
                    $input['reg_no']=$code[0]->code.'000/'.date("y").'/'.$count;
            }elseif($count<100){
                $input['reg_no']=$code[0]->code.'00/'.date("y").'/'.$count;
            }elseif($count<1000){
                $input['reg_no']=$code[0]->code.'0/'.date("y").'/'.$count;
            }
            else{
                $input['reg_no']= $code[0]->code.'/'.date("y").'/'.$count;
            }
            $input['username'] = $input['reg_no'];
            $input['class_type_id'] = $code[0]->group_id;
            $input['class_id'] = $cls[0]->id;
            
                if($profile = Student::create($input)){
                    $input['userable_id'] = $profile->id;
                }
                break;
        }
        $user = User::create($input); 
        $user['token'] =  $user->createToken('MyApp')-> accessToken; 
    return response()->json(['success'=>true,'user'=>$user], $this->successStatus); 
    }
    /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function user() 
    { 
        $user = Auth::user(); 
        $user->userable;
        return response()->json(['user' => $user], $this-> successStatus); 
    } 

    /** 
     *  
     * 
     * @return Array(Users)
     */ 
    public function users() 
    { 
        $users = User::all()->map(function($user)
        {
            return $user->userable;
        }); 
        
        return response()->json(['users'=>$users], $this-> successStatus); 
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