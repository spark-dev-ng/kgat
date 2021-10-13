<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParentTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parents', function (Blueprint $table) {
			$table->id();
			$table->string('name');
			$table->string('gender', 6)->nullable();
			$table->string('phone', 20)->nullable();
			$table->string('email', 25)->nullable();
			$table->string('religion', 25)->nullable();
			$table->string('occupation', 200)->nullable();
			$table->string('address', 500)->nullable();
			$table->string('profile_pix')->nullable();
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
		Schema::drop('parents');
	}
}
