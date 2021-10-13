<?php namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Student;

class Session extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'sessions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','status', 'created_at', 'updated_at'];

    /**
     * This function moves all students to a new class for every new session.
     * That is listen for an update in the sessions table.
     */
    protected static function addLevel()
    {
        parent::boot();

        static::updated(function($session) {
            $allStudents = Student::all();
            foreach ($allStudents as $student) {
                if ($student->class_id < 15) {
                    $student->class_id = $student->class_id + 1;
                    $student->save();
                }
            }
        });
    }

    /**
     * Gets the list of academic sessions for the next 50 years.
     * @return array
     */
    public static function Sessions()
    {
        $current_session = static::find(1);
        $yearArray = preg_split('/\//', $current_session->name);

        $sessions = [];

        for ($i = $yearArray[0]; $i < $yearArray[0] +51; $i++) {
            $sessions[] = $i . '/'. ($i + 1);
        }

        return $sessions;
    }

    public static function active()
    {
        $session = Session::where('status',1)->first();
        if(@$session && $session->count()<1){
            return $session = Session::where('id','>',0)
            ->orderBy('id','desc')
            ->get()[0];
        }
        return Session::where('status',0)->orderBy('id','desc')->first();
    }
}
