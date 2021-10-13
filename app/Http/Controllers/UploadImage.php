<?php namespace App\Http\Controllers;

use Intervention\Image\Facades\Image;

class UploadImage {
    //use GenerateRegNumber;

    /***
     * THis processes an image and saves to the specified directory.
     * @param $image
     * @return string
     */
    public static function upload($image,$dir='', $size=null, $callback=null){
        if($image){
           $imageName = time().'.'.$image->extension(); 
            $image->move(public_path($dir), $imageName);

            return $imageName; 
        }
        return false;
    }
}





