<?php
namespace Database\Seeders;
use Illuminate\Database\seeder;
use App\Admin;
use App\User;

class AdminTableSeeder extends Seeder {

    public function run()
    {
        Admin::truncate();

        $admin = Admin::create(array(
            'name' => 'Administrator',
            'username'=>'admin'));

        User::create(array(
            'username'=> $admin->username,
            'userable_id'=>$admin->id,
            'userable_type'=>"App\\Admin",
            'password' => 'admin123'
        ));
    }
}
