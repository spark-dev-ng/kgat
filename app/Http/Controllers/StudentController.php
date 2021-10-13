<?php namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Routing\Registrar;
use App\Http\Controllers\Auth\StudentAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UploadImage;
use Intervention\Image\Facades\Image;
use App\Student;
use App\Result;
use App\Session;

class StudentController extends Controller {

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

    use StudentAuth;

    /**
     * Create a new authentication controller instance.
     *
     * @param  \Illuminate\Contracts\Auth\Guard  $auth
     * @param  \Illuminate\Contracts\Auth\Registrar  $registrar
     * @return void
     */
    public function __construct(Guard $auth)//, Registrar $registrar)
    {
        $this->auth = $auth; 
        //$this->registrar = $registrar;

        $this->middleware('student_auth', [
            'except' => ['getIndex', 'getRegister', 'postLogin', 'postRegister','getStudent',
            'postPicture']
        ]);

    }

    /**
     * THis shows the currently logged in user's profile
     * @return string
     */
    public function getProfile()
    {
        $student = $this->auth->user();

        $student =Student::find($student->userable_id);
        return view('pages.student.profile')->with('student', $student);
    }
    

    /**
     * THis shows the currently logged in user's profile
     * @return string
     */
    public function getStudent(Student $student)
    {
        // $student = $this->auth->user();

        // $student =Student::find($student->userable_id);
        return  response()->json(['success'=>true,'student'=>$student],200);
    }
    /**
     * This shows the details update form for students.
     * @return $this
     */
    public function getEditProfile(Student $student)
    {
       
        return view('pages.student.edit-profile')->with('student', $student);
    }

    /**
     * THis displays a Quick Result Page for this subjects.
     * @param $class
     * @param $subjects
     * @param $school
     * @param $classTerm
     * @return $this
     */
    public function getViewResult()
    {
        $student = $this->auth->user();
        $student = Student::find($student->userable_id);
       
        $session = Session::active();

        return view('pages.student.view-result')->with(array(
            'session' => $session,
            'student' => $student,
        ));
    }

    /**
     * This functions returns the payment page.
     * @return string
     */
    public function getPayment(Request $request)
    {
        $student = Auth::user()->userable;
        
        return view('pages.student.payment', compact('student'));
    }

    /**
     * This function handles profile update for this teacher.
     * @param Request $request
     * @return $this|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function postEditProfile(Request $request)
    {

        $student_id = $request->input('student_id');

        $validator = Validator::make($request->except('student_id'), Student::$updateRules);

        if ($validator->fails())
            return redirect('/student/edit-profile/'.$student_id)
                ->withInput($request->all())
                ->withErrors($validator);

        $student = Student::find($student_id);

        if ($request->hasFile('profile_pic')) {
            $student->profile_pic = UploadImage::upload($request->file('profile_pic'), 'student_photo');
        }

        if ($student->save())
            return redirect('/student/profile');
    }
       /**
     * Log the user out of the application.
     *
     * @return \Illuminate\Http\Response
     */
    // public function postPicture(Request $req)
    // {
    //     // dd($req->profile_pic);
    //     if($req->hasFile('profile_pic') 
    //     // && $req->hasFile('profile_pic')->isValid()
    //     ){
    //         $req->validate([
    //             'profile_pic' => 'mimes:jpeg,jpg,png,gif|max:2028'
    //         ]);
            
    //     dd($req->file('profile_pic'));
    //          $url = UploadImage::upload($req->profile_pic, 'student_photo');
    //         return  response()->json(['success'=>true,'url'=>$url],200);
    //     }else{
    //         return  response()->json(['success'=>false,'msg'=>'Not submitted'],400);
    //     }
    // }
    //     public function postPicture(Request $request)
    // {
    //     // dd($request->file('profile_pic'));
    //     $request->validate([
    //         'profile_pic' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    //     ]);
    
    //     $imageName = time().'.'.$request->profile_pic->extension();  
     
    //     $request->profile_pic->move(public_path('student_photo'), $imageName);
  
    //     /* Store $imageName name in DATABASE from HERE */
    
    //     return  response()->json(['success'=>true,'msg'=>$imageName],200); 
    // }
    public function postPicture(Request $request)
    {
        if($request->image){
            $dir = '/images/profiles/';
            $arr1 = explode(':', substr( $request->image,0,strpos( $request->image,';')));
            $ext = explode('/',$arr1[1])[1];
        $name = time().'.'.$ext;
        \Image::make( $request->image)->save(public_path($dir).$name);
         return  response()->json(['success'=>true,'url'=>public_path($dir).$name],200); 
        }        
        return  response()->json(['success'=>false,'msg'=>'Image not uploaded'],401); 
    }
}
