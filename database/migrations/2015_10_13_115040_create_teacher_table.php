<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeacherTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('teachers', function(Blueprint $table)
		{
			$table->id();
			$table->string('name');
			$table->string('gender', 6);
			$table->string("dob", 25)->nullable();
			$table->string('address')->nullable();
			$table->string('class');
			$table->string('classes')->nullable();
			$table->string('reg_no', 9)->unique();
			$table->string('profile_pic')->default('/images/profiles/default.jpg');
			$table->string("phone", 25);
			$table->string("phone2", 25)->nullable();
			$table->string("subjects", 200)->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('teachers');
	}

}
