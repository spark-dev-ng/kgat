<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use \App\Session;

class Result extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'results';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['student_id','subject_id', 'class_id', 'ca', 'score', 
    'session_id','term_id','class_school_id','school_id'];

    public function term()
    {
        return $this->belongsTo('App\Term', 'term_id');
    }
    
    public function student()
    {
        return $this->belongsTo('App\Student', 'student_id');
    }

    public function subject()
    {
        return $this->belongsTo('App\Subject', 'subject_id');
    }
    public function session()
    {
        return $this->belongsTo(Session::class,'session_id');
    }

    
    public static function processResult($result)
    {
        $result = (int)$result;

        if ($result >= 60 && $result < 70)
            return "B";

        if ($result >= 50 && $result < 60)
            return "C";

        if ($result >= 40 && $result < 50)
            return "D";

        if ($result >= 30 && $result < 40)
            return "E";

        if ($result < 30)
            return "F";
        else
            return "A";
    }
}
