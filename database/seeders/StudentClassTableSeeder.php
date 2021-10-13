<?php
namespace Database\Seeders;
use Illuminate\Database\seeder;
use App\StudentClass;

class StudentClassTableSeeder extends Seeder {

    public function run()
    {
        StudentClass::truncate();

        StudentClass::create(array(
            'name' => 'Pre Nursery',
            'group_id' => 1
        ));

        foreach(range(1, 2) as $range) {
            StudentClass::create(array(
                'name' => 'Nursery '.$range,
                'group_id' => 2
            ));
        }

        foreach(range(1, 6) as $range) {
            StudentClass::create(array(
                'name' => 'Primary '.$range,
                'group_id' => 3
            ));
        }

        foreach(range(1, 3) as $range) {
            StudentClass::create(array(
                'name' => 'JS '.$range,
                'group_id' => 4
            ));
        }

        foreach(range(1, 3) as $range) {
            StudentClass::create(array(
                'name' => 'SS '.$range,
                'group_id' => 5
            ));
        }
    }
}
