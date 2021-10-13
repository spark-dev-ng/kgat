<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class College extends Model {


    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'college';
    
    protected $fillable = ['name', 'title', 'email','pmb', 'address', 'about', 'started','app-status','status','logo_url','banner_url'];
    public function getDetails()
    {
       return College::find(1);
    }



}
