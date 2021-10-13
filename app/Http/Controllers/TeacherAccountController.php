<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Teacher;
use App\User;
use App\StudentClass;
use Illuminate\Support\Facades\App;
use Validator;
use Illuminate\Http\Request;
use App\RegNumberGenerator;
use App\Http\Controllers\UploadImage;

class TeacherAccountController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return view('admin.teachers.home');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return view('admin.teachers.create');
    }

    /**
     * This creates a new Teacher and also stores its corresponding detail in the user's table.
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), Teacher::$validationRules);
        //return dd($request->all());
        if ($validator->fails())
            return redirect('/teachers/create')
                ->withInput($request->all())
                ->withErrors($validator);

        $generator = new RegNumberGenerator;
        $reg_no = $generator->generate('Teacher','TC');

        if ($request->hasFile('image-file')) {
            $request['profile_pix'] = UploadImage::upload($request->file('image'), 'teacher_photo',600,null);
        } else {
            $request['profile_pix'] = 'default.jpg';
        }
        $request['school_id'] = StudentClass::find($request->input('class_id'))->school_id;


        $teacher = Teacher::create(array_merge($request->except(['image-file','password']),
            ['teacher_reg'=>$reg_no]));

        User::create([
            'username'=> $teacher->teacher_reg,
            'userable_id' => $teacher->id,
            'userable_type' => 'App\\Teacher',
            'password' => $request->password
        ]);

        return view('admin.teachers.details')->with('details', $teacher);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $teacher = Teacher::find($id);
        return view('admin.teachers.show')->with('teacher', $teacher);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $teacher = Teacher::find($id);
        return view('admin.teachers.edit')->with('teacher', $teacher);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), Teacher::$validationRules);

        if ($validator->fails())
            return redirect('/teachers/'.$id .'/edit')
                ->withInput($request->all())
                ->withErrors($validator);

        $teacher = Teacher::find($id);
        $teacher->name = $request->input('name');
        $teacher->gender = $request->input('gender');
        $teacher->phone = $request->input('phone');
        $teacher->dob = $request->input('dob');
        $teacher->address = $request->input('address');
        $teacher->class_id = $request->input('class_id');
        //return (dd($request->file('image')));

        $teacher->school_id = StudentClass::find($request->input('class_id'))->school_id;

        if ($request->hasFile('image')) {
            $teacher->profile_pix = UploadImage::upload($request->file('image'), 'teacher_photo');
        }

        if ($teacher->save())
            return view('admin.teachers.details')->with(['details'=>$teacher, 'update'=>true]);

        return redirect('/teachers/'.$id .'/edit')
            ->withInput($request->all())
            ->withErrors("Unable to updatse this teacher's info...");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id){}

    /**
     * This fetches all teachers without filtering.
     * @return $this
     */
    public function all()
    {
        $teachers = Teacher::all();
        return view('admin.teachers.all')->with('teachers', $teachers);
    }

    /**
     *THis method shows the list of filtered teachers
     * @param Request $request
     * @return $this
     */
    public function filtered(Request $request)
    {
        $classId = $request->input('class_id');

        if($classId=='All'){
            $teachers = Teacher::all();
        }else{
            $teachers = Teacher::where('class_id', $classId)->get();
        }
        
        return view('admin.teachers.all')->with('teachers', $teachers);

    }

}
