<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();


        $this->call([
            AdminTableSeeder::class,
            TeacherTableSeeder::class,
            GuardianTableSeeder::class,
            StudentTableSeeder::class,
            StudentClassTableSeeder::class,
            // CategoryTableSeeder::class,
            // ThreadTableSeeder::class,
            TermTableSeeder::class,
            // SchoolTableSeeder::class,
            SubjectTableSeeder::class,
            // PostTableSeeder::class,
            // NewsBoardTableSeeder::class,
            ClassGroupTableSeeder::class,
            StudentClassTableSeeder::class,
        ]);
        

    }
}
