<?php

namespace App;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class FileUploader {

    /**
     * @var Model
     */
    protected $model;


    /**
     * The UploadedFile Instance.
     *
     * @var UploadedFile
     */
    protected $file;


    /**
     * Create a new FileUploader form object.
     *
     * @param Model $Post
     * @param UploadedFile $file
     * @param Thumbnail|null $thumbnail
     */
    public function __construct(Model $model, UploadedFile $file, $dir = null) {
        $this->model = $model;
        $this->file = $file;
        $this->dir = $dir ?: 'uploaded-files';
    }


    /**
     * Process the form.
     */
    public function save() {
        // move a file to the base directory with the file name.
        $this->file->move($uploaded->baseDir(), $uploaded->name);

        // Attach the file to the model.
        $uploaded = $this->model->addFile($this->makeFilename());

        
    }

    /**
     * Make a Filename, based on the uploaded file.
     *
     * @return string
     */
    protected function makeFilename() {

        // Get the file name original name
        // and encrypt it with sha1
        $name = sha1 (
            time() . $this->file->getClientOriginalName()
        );

        // Get the extension of the photo.
        $extension = $this->file->getClientOriginalExtension();

        // Then set name = merge those together.
        return "{$name}.{$extension}";
    }

}