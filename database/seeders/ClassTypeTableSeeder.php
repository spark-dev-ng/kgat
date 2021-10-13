<?php
namespace Database\Seeders;
use Illuminate\Database\seeder;
use App\School;

class ClassTypeTableSeeder extends Seeder {

    public function run()
    {
        School::truncate();

        $groups = ['GENERAL', 'SCIENCE', 'ART', 'COMMERCIAL', 'TECHNICAL', 'BASIC'];

        foreach($groups as $key => $group) {
            School::create(array(
                'name' => $group,
            ));
        }
    }
}
