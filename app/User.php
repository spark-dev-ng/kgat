<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Model implements AuthenticatableContract {

	use Authenticatable, Notifiable, HasApiTokens;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['username', 'password', 'userable_id', 'userable_type', 'remember_token'];

	public static $CreateRules =[
        'username' => 'required|string|min:3|max:15|unique:users',
        'password' => 'required|string|min:6|max:32',
    ];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password', 'remember_token'];

    public function userable()
    {
        return $this->morphTo();
    }

    public function getStudent()
    {
        return Student::find($this->userable_id);
    }


    public function getTeacher()
    {
        return Teacher::find($this->userable_id);
    }


    public function getGuardian()
    {
        return Guardian::find($this->userable_id);
    }

    public function getAdmin()
    {
        return Admin::find($this->userable_id);
    }


    protected function setPasswordAttribute($password)
    {
    	$this->attributes['password'] = bcrypt($password);
    }

}
