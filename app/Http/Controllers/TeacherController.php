<?php namespace App\Http\Controllers;

use App\Session as Session;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Routing\Registrar;
use App\Http\Controllers\Auth\TeacherAuth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Teacher;
use App\Student;
use App\Term;
use App\Subject;
use App\Result;
use App\School;
use App\ClassGroup as Group;
use League\Flysystem\Exception;
use App\StudentClass;

class TeacherController extends Controller {

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

    use TeacherAuth;


    /**
     * Create a new authentication controller instance.
     *
     * @param  \Illuminate\Contracts\Auth\Guard  $auth
     * @param  \Illuminate\Contracts\Auth\Registrar  $registrar
     * @return void
     */
    public function __construct(Guard $auth, Registrar $registrar)
    {
        $this->auth = $auth;
        $this->registrar = $registrar;

        $this->middleware('teacher_auth', [
            'except' => ['index', 'getIndex', 'getLogout', 'getRegister', 'postLogin', 'postRegister']
        ]);

    }

    
    /**
     * THis shows the currently logged in user's profile
     * @return string
     */
    public function getProfile()
    {
        $teacher = $this->auth->user();
        $teacher =Teacher::find($teacher->userable_id);
        return view('pages.teacher.profile')->with('teacher', $teacher);
    }

    /**
     * This shows the details update form for students.
     * @return $this
     */
    public function getEditProfile($id)
    {
        $teacher =Teacher::find($id);
        return view('pages.teacher.edit-profile')->with('teacher', $teacher);
    }

    /**
     * This shows the result upload page for this pages.teacher.
     * @return $this
     *
    public function getResult()
    {
        $teacher = $this->auth->user();

        $teacher = Teacher::find($teacher->userable_id);

        $students = Student::where('class_id', $teacher->class_id)->orderBy('name', 'asc')->get();  

        $terms = Term::all();
        $group = Group::all();

        $subjects = Subject::where('school_id', $teacher->school_id)->get();

        $academic_session = Session::all()->first();

        return view('pages.teacher.result')->with(array(
            'academic_session' => $academic_session,
            'teacher' => $teacher,
            'students' => $students,
            'terms' => $terms,
            'groups' => $groups,
            'subjects' => $subjects
        ));
    }*/

    public function resultRdr(Request $req)
    {
        return redirect("teacher/result/$req->group/$req->term"); 
    }

    

    /**
     * THis displays a Quick Result Page for this subjects.
     * @param $class
     * @param $subjects
     * @param $school
     * @param $classTerm
     * @return $this
     */
    public function resultIndex()
    {
        $teacher = $this->auth->user();
        $teacher = Teacher::find($teacher->userable_id);
        $terms = Term::all();
        $subjects = Subject::where('school_id', $teacher->class->school_id)->get();
        $groups = Group::all();
        $sessions = Session::all();
        $academic_session = $sessions->first();
        $classes = StudentClass::where('school_id', $teacher->class->school_id)->get();
        return view('pages.teacher.result-index')->with(array(
            'academic_session' => $academic_session,
            'teacher' => $teacher,
            'terms' => $terms,
            'subjects' => $subjects,
            'groups'=>$groups,
            'classes'=>$classes,
            'sessions'=>$sessions
        ));
    }

    

    /**
     * THis displays a Quick Result Page for this subjects.
     * @param $class
     * @param $subjects
     * @param $school
     * @param $classTerm
     * @return $this
     */
    public function getClassResult(Request $request, $group = 'A', $term=1)
    {
        
        $teacher = Auth::user();
        $teacher = Teacher::find($teacher->userable_id);
        $class = $teacher->class;
        $terms = Term::all();
        $subjects = Subject::where('school_id', $teacher->school_id)->get();
        $group = Group::where('name',$group)->orWhere('id', $group)->first();
        $groups = Group::all();
        $session = Session::all()->first();
        $results = Result::where('class_id', $class->id)
            ->where('school_id', $teacher->school_id)
            ->where('term_id', (int)$term)
            ->where('group_id', $group->id)
            ->where('session_id', $session->name)
            ->get();
        //substr_replace(string, replacement, start)
        return view('pages.teacher.view-class-result')->with(array(
            'academic_session' => $session,
            'teacher' => $teacher,
            'term' => $term,
            'terms' => $terms,
            'subjects' => $subjects,
            'group'=>$group,
            'groups'=>$groups,
            'results'=>$results 
        ));
    }

    /**
     * THis displays a Quick Result Page for this subjects.
     * @param $class
     * @param $subjects
     * @param $school
     * @param $classTerm
     * @return $this
     */
    public function postNewRecord(Request $request)
    {
        $view = $request->view;
        $new = $request->new;

        $teacher = $request->input('teacher_id');
        $teacher = Teacher::find($teacher);

        $subject = $request->input('subjects');
        $class_id = $request->input('class_id');
        $type = $request->input('school_id');
        $term = $request->input('term');
        $session = Session::where('id', $request->session_id)->first();
        $group = $request->group;

        if(isset($group) && $group ==='All'){
            $students = Student::where('class_id',$class_id)
            ->get();
        }else{
            $students = Student::where('class_id',$class_id)
            ->where('group_id', Student::getGroup($group)->id)
            ->get();
        }
        
        $groups = Group::all();

        $terms = Term::all();
        $class = StudentClass::find($class_id);

        $subjects = Subject::where('school_id', $teacher->school->id)->get();

        $results = Result::where('class_id', $class_id)
            ->where('school_id', $type)->where('term_id', $term)
            ->where('session_id', $session->id)->get();
        if($view == true){
            return view('pages.teacher.class-result-viewer')->with(array(
                'academic_session' => $session,
                'teacher' => $teacher,
                'terms' => $terms,
                'subjects' => $subjects,
                'results' => $results,
                'students'=>$students,
                'group'=>$group,
                'groups'=>$groups,
                'term'=>$term,
                'class'=>$class,
                'subject'=>$subject
            ));
        }else{
            return $this->postCreateResult($request);
        }
    }
    /**
     * THis displays a Quick postCreateResult Page for this subjects.
     * @param $class
     * @param $subjects
     * @param $school
     * @param $classTerm
     * @return $this
     */
    public function postCreateResult(Request $request)
    {
        $teacher = $request->input('teacher_id');
        $teacher = $this->auth->user()->getTeacher();
        //return dd($request->all());
        $subject = $request->input('subject');
        $class_id = $request->input('class_id');
        $type = $request->input('school_id');
        $term = $request->input('term');
        $school_id = $request->input('school_id');
        $session = $request->input('session_id');
        $session = Session::where('id', $session)->first();
        $students = Student::where('class_id',$class_id)
        ->get();
        $class = StudentClass::find($class_id);
        $terms = Term::all();

        $results = Result::where('class_id', $class_id)
        ->where('subject_id', $subject)
        ->where('term_id', $term)
        ->where('school_id', $school_id)
        ->where('session_id', $session)
        ->get();
        $subjects = Subject::where('school_id', $teacher->school_id)->get();

       return view('pages.teacher.create-result')->with(array(
            'session' => $session,
            'teacher' => $teacher,
            'term' => $term,
            'subjects'=>$subjects,
            'subject' => $subject,
            'students'=>$students,
            'school_id'=>$school_id,
            'class_id'=>$class_id,
            'class'=>$class,
        ));
    }

        /**
     * THis displays a Quick postCreateResult Page for this subjects.
     * @param $class
     * @param $subjects
     * @param $school
     * @param $classTerm
     * @return $this
     */
    public function teacherResult(Request $request, Subject $subject,Term $term)
    {
        $user_id = Auth::user()->id;
        $teacher = Teacher::find($user_id);
        //return dd($term);
        $results = Result::where('term_id', $term->id)
        ->where('subject_id', $subject->id)
        ->get();

       return view('pages.teacher.teacher-result')->with(array(
            'session' => Session::all()->first(),
            'teacher' => $teacher,
            'results' => $results,
            'subject'=>$subject,
            'term'=>$term
        ));
    }

    /**
     * This handles result uploads.
     * @return $this
     */
    public function saveResult(Request $request)
    {
        //return dd($request->all());
        $teacher = $request->input('teacher_id');
        $teacher = Teacher::find($teacher);
        $subject = $request->input('subject');
        $class_id = $request->input('class_id');
        $school_id = $request->input('school_id');
        $term = $request->input('term');
        $session_id = $request->input('session');
        $students = $request->input('students');
        $scores = $request->scores;
        $cas = $request->cas;        

        //THis extracts the student's id from the input name attribute.
        foreach($scores as $key => $val) {
            $student = Student::find($students[$key]);
            if($student){
                $result = $student->getSessionResult($subject, $session_id, $term);
                if($result && $result->count()>0){
                    
                    $result->update([
                        'score' => $scores[$key],
                        'ca' => $cas[$key]]);
                }else{
                    try {
                        Result::create([
                        'subject_id' => $subject,
                        'class_id' => $class_id,
                        'school_id' => $school_id,
                        'term_id' => $term,
                        'group_id' => $student->group_id,
                        'session_id' => $session_id,
                        'student_id' => $students[$key],
                        'score' => $scores[$key],
                        'ca' => $cas[$key]]);
                    } catch(QueryException $e) {
                        return redirect('/teacher/result')
                            ->withInput($request->all())
                            ->withErrors("$e.");
                    }
                }
            }
                    
        }
        
        return redirect("/teacher/result")->with(['message'=>'Result uploaded']);
    }

    /**
     * This function handles profile update for this pages.teacher.
     * @param Request $request
     * @return $this|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function postEditProfile(Request $request)
    {

        $teacher_id = $request->input('teacher_id');

        $validator = Validator::make($request->except('teacher_id'), Teacher::$updateRules);

        if ($validator->fails())
            return redirect('/teacher/edit-profile/'.$teacher_id)
                ->withInput($request->all())
                ->withErrors($validator);

        $teacher = Teacher::find($teacher_id);
        $teacher->phone = $request->input('phone');
        $teacher->address = $request->input('address');

        if ($request->hasFile('profile_pix')) {
            $teacher->profile_pix = UploadImage::upload($request->file('profile_pix'), 'teacher_photo');
        }

        if ($teacher->save())
            return redirect('/teacher/profile');
    }

}
