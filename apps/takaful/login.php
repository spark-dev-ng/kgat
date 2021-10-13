<?php
require  "./vendor/autoload.php";
require  "./src/Brainstorm/Takaful/db.php";

$row = login(['email'=>'ibagwai9@gmail.com','password'=>'']);

print_r($row);
?>