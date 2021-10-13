<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'classes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'group_id'];

    
    public function results()
    {
        return $this->hasMany('App\Result','student');
    }
    public function getRresult($fields)
    {
        return Result::where('student',$this->id)
        ->where('subject', @$fields->subject)
        ->where('term', @$fields->term);
    }

    public function student()
    {
        return $this->hasMany('App\Student');
    }

    public function teacher()
    {
        return $this->hasOne('App\Teacher');
    }

    public function school()
    {
        return $this->belongsTo('App\school', 'school_id');
    }

}
