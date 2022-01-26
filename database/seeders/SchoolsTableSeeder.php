<?php
namespace Database\Seeders;
use Illuminate\Database\seeder;
use App\School;

class SchoolsTableSeeder extends Seeder {

    public function run()
    {
        School::truncate();

        $groups = [
            ['name'=> 'Pre Nursery','code'=>'PN'],
            ['name'=> 'Nursery','code'=>'NU'],
            ['name'=> 'Primary','code'=>'PR'],
            ['name'=> 'Junior Secondary','code'=>'JS'],
            ['name'=> 'Senior Secondary','code'=>'SS']
        ];

        foreach($groups as $key => $group) {
            School::create(array(
                'name' => $group['name'],
                'code' => $group['code']
            ));
        }
    }
}
