<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'subjects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'school_id'];

    /*
     * Some Validation rules for this model's new instance.
     */
    public static $validationRules = array(
        'name' => 'required|string',
        'school_id' => 'required|integer',
    );

    public function school()
    {
        return $this->belongsTo('App\school', 'school_id');
    }
}
