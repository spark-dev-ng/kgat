<?php

namespace App;
use App\Session;
use App\Student;
use App\Teacher;

class RegNumberGenerator
{

	public function generate($user, $code)
	{
		$session = Session::active()->name;
		$session ="$session";
		$code .='/'.$session[2].$session[3]; 
		
		if($user === "Student"){
			$count = Student::all()->count();
			$count+=1;
			
			return $code."/$count";
		}else{
			$count = Teacher::all()->count();
			$count+=1;

			return $code."/00$count";
		}
	}

	public function generateSave($user)
	{
		$code = ''; 
		$count = Student::All()->count();
		$count+=1;
		if($user->userable_type === "App\\Student"){
			$code .= $user->getStudent()->studentClass->name[0];
			$code .= $user->getStudent()->studentClass->name[1];
			$user->reg_no = $code."/$count";
			$user->save();
		}
	}

}
