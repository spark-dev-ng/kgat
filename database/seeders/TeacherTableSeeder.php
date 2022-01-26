<?php
namespace Database\Seeders;

use App\Student;
use Illuminate\Database\seeder;
use App\Teacher;
use App\User;
use App\StudentClass;
use App\Subject;

class TeacherTableSeeder extends Seeder {

    public function run()
    {
        Teacher::truncate();
        $sbjs = Subject::all();
        $cls = StudentClass::all();
        
        $faker = \Faker\Factory::create();

        foreach(range(1, 10) as $range) {
            $teacher = Teacher::create(array(
                'name' => $faker->name,
                'gender' => ($range>3 ? 'Male': 'Female' ),
                'class' => $faker->numberBetween(1, 11),
                'classes' => implode(',',[$faker->numberBetween(1,3),$faker->numberBetween(3,5),$faker->numberBetween(5,10)]),
                'reg_no' => 'TC'. $range,
                'address' => $faker->address,
                'phone' => $faker->phoneNumber,
            ));

            User::create(array(
                'username'=> $teacher->reg_no,
                'userable_id'=>$teacher->id,
                'userable_type'=>"App\\Teacher",
                'password' => '123456',  
            ));
        }
    }
}
