<?php

namespace App;

use App\Model;

class Student extends Model
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'students';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'dob',
    'pob',
    'first_name',
    'last_name',
    'other_name',
    'gender',
    'state',
    'lga',
    'phone',
    'phone2',
    'religion',
    'occupation',
    'email',
    'reg_no',
    'has_extra_class',
    'class_id',
    'class_type_id',
    'parent_id',
    'session_id',
    'profile_pix',
    'created_at',
    'updated_at'
  ];

  /*
     * Some Validation rules for this model's new instance.
     */
  public static $validationRules = array(
    'name' => 'required|string',
    'gender' => 'required',
    'class_id' => 'required|integer',
    'dob' => 'required|date',
    'profile_pix' => 'image',
    'reg_no' => 'unique:students'
  );

  public static $updateRules = array(
    'profile_pix' => 'image',
  );

  public function results()
  {
    return $this->hasMany('App\Result');
  }
  public function getResult($subject, $term)
  {
    return Result::where('student_id', $this->id)
      ->where('subject_id', $subject)
      ->where('term_id', $term)
      ->first();
  }

  public function getSessionResult($subject, $session, $term)
  {
    return Result::where('student_id', $this->id)
      ->where('subject_id', $subject)
      ->where('session_id', $subject)
      ->where('term_id', $term)
      ->first();
  }

  public function session()
  {
    return $this->belongsTo('App\Session', "session_id");
  }

  public function studentClass()
  {
    return $this->belongsTo('App\StudentClass', "class_id");
  }

  public function class()
  {
    return $this->belongsTo('App\StudentClass', "class_id");
  }

  public function school()
  {
    return $this->belongsTo('App\school', 'school_id');
  }

  public function guardian()
  {
    return $this->belongsTo('App\Guardian', 'parent_id');
  }

  public function parent()
  {
    return $this->belongsTo('App\Guardian', 'parent_id');
  }

  public function group()
  {
    return $this->belongsTo('App\ClassGroup', 'group_id');
  }

  public function user()
  {
    return $this->morphOne('App\User', 'userable');
  }

  public static function getGroup($value = '')
  {
    return ClassGroup::where('name', $value)->first();
  }
  // protected function setReg_noAttribute($reg_no)
  // {
  //   $this->attributes['reg_no'] = Student::where('id', '>', 1)->count();
  // }
}
