<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class School extends Model {

    protected $table = "schools";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    public function classes()
    {
        return $this->hasMany('App\StudentClass');
    }

}
