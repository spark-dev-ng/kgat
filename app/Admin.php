<?php namespace App;

use App\Model;

class Admin extends Model {

    protected $table = "admins";
    protected $fillable = ['name','username'];
    public function user()
    {
        return $this->morphOne('App\User', 'userable');
    }

}
