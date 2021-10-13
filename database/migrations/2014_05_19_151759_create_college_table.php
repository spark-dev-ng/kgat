<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCollegeTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create(
			'college',
			function (Blueprint $table) {
				$table->id();
				$table->string('name');
				$table->string('title');
				$table->string('email');
				$table->string('pmb');
				$table->string('address');
				$table->string('about');
				$table->date('started');
				$table->string('app-status');
				$table->boolean('status');
				$table->string('logo_url');
				$table->string('banner_url');
			}
		);

		DB::table('college')->insert(
			array(
				[
					'name' => 'School', 'title' => 'My School',
					'email' => 'myschool321@gmail.com',
					'pmb' => '5686', 'address' => 'No.5 Naibawa Kano',
					'status' => 1,
					'started' => '1991-12-26',
					'about' => 'Started',
					'app-status' => 'Started',
					'about' => 'Started',
					'logo_url' => 'Started',
					'banner_url' => 'Started',

				]

			)
		);
	}
	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('college');
	}
}
