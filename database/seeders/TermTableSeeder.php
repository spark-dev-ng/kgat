<?php
namespace Database\Seeders;
use Illuminate\Database\seeder;
use App\Term;

class TermTableSeeder extends Seeder {

    public function run()
    {
        Term::truncate();

        $groups = ['FIRST', 'SECOND', 'THIRD'];

        foreach($groups as $key => $group) {
            Term::create(array(
                'name' => $group,
            ));
        }
    }
}
