<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Guardian extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'parents';

    public static $updateRules =[
        'phone' => 'digits_between:11,14',
        'profile_pix' => 'image',
        'address' => 'required|string|min:10|max:250',
    ];
    
    public static $CreateRules =[
        'name' => 'required|string|min:3|max:30',
        'phone' => 'digits_between:11,14|unique:parents',
        'gender' => 'required|string',
        'address' => 'required|string|min:10|max:250',
    ];

    protected $fillable = ['name','gender','phone', 'address'];

    public function user()
    {
        return $this->morphOne('App\User', 'userable');
    }

    protected function username(){
        return $this->phone;
    }

    public function students()
    {
        return $this->hasMany('App\Student','parent_id');
    }
}
