<?php
use App\College;

function thisCollege(){
	$college = new College;
	return $college->getDetails();
}
/*
function asset($path, $secure = null)
    {
        $path2='myschool/'.$path;
        return app('url')->asset($path2, $secure);
    }
*/
?>