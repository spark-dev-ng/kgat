<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'attendance';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['status','student_id','class','teacher_id'];

    

}
