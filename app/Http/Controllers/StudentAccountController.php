<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Student;
use App\User;
use App\RegNumberGenerator;
use Illuminate\Support\Facades\App;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\UploadImage;

class StudentAccountController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('admin.students.home');
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return view('admin.students.create');
	}

	/**
     * This creates a new Student and also stores its corresponding detail in the user's table.
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
        $request['username'] = $request->reg_no;
        $user_data = $request->only('username', 'password');
        $validator1 = Validator::make($request->all(), Student::$validationRules);
        $validator2 = Validator::make($user_data, User::$CreateRules);

        if ($validator1->fails())
            return back()
                ->withInput($request->all())
                ->withErrors($validator1);

        if ($validator2->fails())
            return back() 
                ->withInput($request->all())
                ->withErrors($validator2);

        $class = \App\StudentClass::find($request->class_id);
        $school = $class->school;
        $base = explode(' ',$class->school->name);
        $code = $base[0][0].$base[1][0];
        $request['school_id'] = $school->id;
    
        $generator = new RegNumberGenerator;
        $reg_no = $generator->generate('Student',$code);

        if ($request->hasFile('image-file')) {
            $request['profile_pix'] = UploadImage::upload($request->file('image-file'), 'student_photo');
        } else {
            $image = 'default.jpg';
        }

        //$school = \App\School::find($request->school_id);
       // return dd($request->school_id);

        $student = Student::create(array_merge($request->except('image'),
            ['reg_no'=>$reg_no]));

        User::create(array_merge($user_data,[
            'userable_id' => $student->id,
            'userable_type' => 'App\\Student'
        ]));

        return view('admin.students.details')->with('details', $student);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        $student = Student::find($id);
        return view('admin.students.show')->with('student', $student);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$student = Student::find($id);
        return view('admin.students.edit')->with('student', $student);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(Request $request, $id)
	{
        $validator = Validator::make($request->all(), Student::$validationRules);

        if ($validator->fails())
            return redirect('/students/'.$id .'/edit')
                ->withInput($request->all())
                ->withErrors($validator);

        $student = Student::find($id);
        $student->name = $request->input('name');
        $student->gender = $request->input('gender');
        $student->dob = $request->input('dob');
        $student->class_id = $request->input('class_id');

        $class = \App\StudentClass::find($request->class_id);
        $request['school_id'] = $class->school_id;

        $student->school_id = $request->input('school_id');

        if ($request->hasFile('image-file')) {
            $student->profile_pix = UploadImage::upload($request->file('image-file'), 'student_photo');
        }else{
            $student->profile_pix = 'default.jpg';
        }

        if ($student->save())
            return view('admin.students.details')->with(['details'=>$student, 'update'=>true]);

        return redirect('/students/'.$id .'/edit')
            ->withInput($request->all())
            ->withErrors("Unable to update this student's info...");
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id){}

    /**
     * This fetches all students without filtering.
     * @return $this
     */
    public function all()
    {
        $students = Student::all();
        return view('admin.students.all')->with('students', $students);
    }

    /**
     *THis method shows the list of filtered students
     * @param Request $request
     * @return $this
     */
    public function filtered(Request $request)
    {
        $classId = $request->input('class_id');

        if($classId=='All'){
            $students = Student::all();
        }else{
            $students = Student::where('class_id', $classId)->get();
        }
        
        return view('admin.students.all')->with('students', $students);

    }

}
