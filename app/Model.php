<?php namespace App;

use Illuminate\Database\Eloquent\Model as BASEMODEL;

class Model extends BASEMODEL {

    /*
    @param int term
    @return string term
    */
    public function getTerm($term)
    {
        $t = '';
        switch ($term) {
            case 1:
                $t = 'first';
                break;
            case 2:
                $t = 'second';
                break;
            case 1:
                $t = 'third';
                break;
           
        }
        return $t;
    }

    public function getGrade($result)
    {
        $result = (int)$result;

        if ($result >= 60 && $result < 70)
            return "B";

        if ($result >= 50 && $result < 60)
            return "C";

        if ($result >= 40 && $result < 50)
            return "D";

        if ($result >= 30 && $result < 40)
            return "E";

        if ($result < 30)
            return "F";
        else
            return "A";
    }
}
