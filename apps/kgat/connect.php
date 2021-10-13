<?php
//First method:
 	if($_POST){
	$connect= mysqli_connect("localhost","root","","mega");
//}
	/*if($connect)
	{
		echo "Connection successfully";
	}
	else
	{
		echo "Connection not established";
	}*/
	//if button with the name uploadfilesub has been clicked
//if(isset($_POST["uploadfilesub"])){
		//declaring variables
		$name=$_POST['name'];
		$address=$_POST['address'];
		$gender=$_POST['gender'];
		$phone=$_POST['phone'];
		$email=$_POST['email'];
		$nextofkin=$_POST['nextofkin'];
		$nextofkinphone=$_POST['nextofkinphone'];
		$password=$_POST['password'];
		$qualification=$_POST['qualification'];
		//$photo=$_POST['photo'];

	/*
	$filename = $_FILES['uploadfile']['name'];
	$filetmpname = $_FILES['uploadfile']['tmp_name'];
	//folder where images will be uploaded
	$folder = "upload/";
	//function for saving the uploaded images in a specific folder
	move_uploaded_file($filetmpname, $folder.$filename);
*/

		$sql_e = "SELECT * FROM info WHERE email='$email'";
  		$sql_p = "SELECT * FROM info WHERE phone='$phone'";
  		$res_e = mysqli_query($connect, $sql_e);
  		$res_p = mysqli_query($connect, $sql_p);

  	if (mysqli_num_rows($res_e) > 0) {
  	  $name_error = "Sorry... email already taken"; 	
  	  echo $name_error;
  	}else if(mysqli_num_rows($res_p) > 0){
  	  $email_error = "Sorry... phone already taken";
  	  echo $email_error; 	
  	}else{

	$INSERT="INSERT INTO info(name,address,gender,phone,email,nextofkin,nextofkinphone,password,
	qualification) values('$name','$address','$gender','$phone','$email','$nextofkin','$nextofkinphone','$password','$qualification')";

	//$results = mysqli_query($connect, $INSERT);
    //echo 'Saved';
      //     exit();
//}

	$input=@mysqli_query($connect,$INSERT);
	if($input)
	{
		header('Location:acknowledgement.php');
		//echo "<br>Record inserted sucessfully";
	}
	else
	{
		echo "<br>Record not inserted";
	}
}
}
?>