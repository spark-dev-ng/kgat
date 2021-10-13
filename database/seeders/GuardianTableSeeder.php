<?php
namespace Database\Seeders;
use Illuminate\Database\seeder;
use App\Guardian;
use App\User;

class GuardianTableSeeder extends Seeder {

    public function run()
    {
        // Guardian::truncate();

        $faker = \Faker\Factory::create();

        foreach(range(1, 10) as $range) {
            $guardian = Guardian::create(array(
                'name' => $faker->name,
                'phone' => $faker->phoneNumber,
                'gender' =>($faker->numberBetween(1, 2) >1 ? 'Male': 'Female'),
            ));

            User::create(array(
                'username'=> $faker->unique()->userName,
                'password'=> "123456",
                'userable_id'=>$guardian->id,
                'userable_type'=>"App\\Guardian"
            ));
        }
    }
}