<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassGroup extends Model {

    protected $table = "classgroups";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','code','group_id'];

    public function classes()
    {
        return $this->hasMany('App\StudentClass', 'group_id');
    }

}
