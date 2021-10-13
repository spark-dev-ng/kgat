<?php
namespace Database\Seeders;
use Illuminate\Database\seeder;
use App\Subject;

class SubjectTableSeeder extends Seeder {

    public function run()
    {
        Subject::truncate();

        $groups = ['MATHEMATICS', 'ENGLISH', 'BASIC SCIENCE', 'BASIC TECHNOLOGY', 'COMPUTER SCIENCE'];

        foreach($groups as $key => $group) {
            Subject::create(array(
                'name' => $group,
                'group_id' => rand(1, 3)
            ));
        }
    }
}
