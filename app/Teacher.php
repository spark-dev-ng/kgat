<?php namespace App;

use App\Model;

class Teacher extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'teachers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'gender','class_id', 'school_id','dob', 'profile_pix', 'teacher_reg', 'address', 'phone','created_at', 'updated_at'];

    /*
     * Some Validation rules for this model's new instance.
     */
    public static $validationRules = array(
        'name' => 'required|string',
        'gender' => 'required',
        'class_id' => 'required|integer',
        'address' => 'required|string',
        'dob' => 'required|date',
        'phone' => 'required|digits_between:6,20|unique:teachers',
        'image' => 'required|image',
    );

    /*
     * Some Validation rules for this model's new instance.
     */
    public static $updateRules = array(
        'address' => 'string',
        'phone' => 'digits_between:6,20',
        'profile_pix' => 'image',
    );

    public function class()
    {
        return $this->belongsTo('App\StudentClass', "class_id");
    }

    public function school()
    {
        return $this->belongsTo('App\School', 'school_id');
    }

    public function user()
    {
        return $this->morphOne('App\User', 'userable');
    }
}
