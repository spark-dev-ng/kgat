<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $this->call([
            SchoolsTableSeeder::class,
            SubjectTableSeeder::class,
            StudentClassTableSeeder::class,
            AdminTableSeeder::class,
            TeacherTableSeeder::class,
            GuardianTableSeeder::class,
            StudentTableSeeder::class,
            // CategoryTableSeeder::class,
            // ThreadTableSeeder::class,
            TermTableSeeder::class,
            // PostTableSeeder::class,
            // NewsBoardTableSeeder::class,
            // ClassGroupTableSeeder::class,
            StudentClassTableSeeder::class,
        ]);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

    }
}
