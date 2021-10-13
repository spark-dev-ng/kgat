<?php
namespace Database\Seeders;
use Illuminate\Database\seeder;
use App\NewsBoard;

class NewsBoardTableSeeder extends Seeder {

    public function run()
    {
        NewsBoard::truncate();

        $faker = \Faker\Factory::create();

        $date = now();

        foreach(range(1, 3) as $range) {
            $news = NewsBoard::create(array(
                'title' => $faker->name,
                'news' => $faker->realText(),
                'featured_image' => bcrypt($date->format('Y-m-d H:i:sP')),
            ));
        }
    }
}