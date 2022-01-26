<?php namespace App;

use App\Model;
use Spatie\Permission\Traits\HasRoles;
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
    protected $fillable = ['name', 'gender','class', 'classes', 'subjects', 'school_id','dob', 'profile_pic', 'reg_no', 'address', 'phone','status','created_at', 'updated_at'];

    /*
     * Some Validation rules for this model's new instance.
     */
    public static $validationRules = array(
        'name' => 'required|string',
        'gender' => 'required',
        'class' => 'required|string',
        'classes' => 'string',
        'subjects' => 'string',
        'address' => 'required|string',
        'dob' => 'required|date',
        'phone' => 'required|digits_between:10,20|unique:teachers',
        'image' => 'required|image',
    );

    /*
     * Some Validation rules for this model's new instance.
     */
    public static $updateRules = array(
        'address' => 'string',
        'phone' => 'digits_between:6,20',
        'profile_pic' => 'image',
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
