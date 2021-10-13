<?php
require  "./vendor/autoload.php";
require  "./vendor/db/Database.php";

function db_connect(){
	$db = null;
	try {
		$db  =  new Database("takaful", 'root', '','127.0.0.1');
	}catch(Exeption $e){
		$e->getMessage();
	}
	return $db;
}
db_connect();

function login(array $auth){
	$db = Database::instance();
	if($db){
		$db->query("select * from users where email ='ibagwai9@gmail.com'");
		$user = $db->row();
		// print_r($user->name);
		if($user->password === bcrypt($auth['password'])){
			return $user;
		}else{
			return false;
		}
	}
}

?>