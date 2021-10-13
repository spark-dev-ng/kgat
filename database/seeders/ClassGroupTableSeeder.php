<?php
namespace Database\Seeders;
use Illuminate\Database\seeder;
use App\ClassGroup;

class ClassGroupTableSeeder extends Seeder {

    public function run()
    {
        ClassGroup::truncate();

        $groups = [
            ['name'=> 'Pre Nursery','code'=>'PN','group_id'=>1],
            ['name'=> 'Nursery School','code'=>'NU','group_id'=>2],
            ['name'=> 'Primary School','code'=>'PR','group_id'=>3],
            ['name'=> 'Junior Secondary','code'=>'JS','group_id'=>4],
            ['name'=> 'Senior Secondary','code'=>'SS','group_id'=>5]
        ];

        foreach($groups as $key => $group) {
            ClassGroup::create(array(
                'name' => $group['name'],
                'code' => $group['code'],
                'group_id' => $group['group_id'],
            ));
        }
    }
}
