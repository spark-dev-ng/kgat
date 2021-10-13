<?php
//First method:
 	if($_POST){
	$connect= mysqli_connect("localhost","root","","gwarzo");
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
		$firstname=$_POST['firstname'];
		$surname=$_POST['surname'];
		$othername=$_POST['othername'];
		$gender=$_POST['gender'];
		$dob=$_POST['dob'];
		$pob=$_POST['pob'];
		$age=$_POST['age'];
		$lg=$_POST['lg'];
		$state=$_POST['state'];
		$religion=$_POST['religion'];
		$address=$_POST['address'];
		$pname=$_POST['pname'];
		$occupation=$_POST['occupation'];
		$pnumber1=$_POST['pnumber1'];
		$pnumber2=$_POST['pnumber2'];
		$email=$_POST['email'];
		$section=$_POST['section'];
		$pword=$_POST['pword'];


		//$photo=$_POST['photo'];

	
	//$filename = $_FILES['uploadfile']['name'];
	//$filetmpname = $_FILES['uploadfile']['tmp_name'];
	//folder where images will be uploaded
	//$folder = "upload/";
	//function for saving the uploaded images in a specific folder
	//move_uploaded_file($filetmpname, $folder.$filename);


		$sql_e = "SELECT * FROM ex WHERE email='$email'";
  		$sql_p = "SELECT * FROM ex WHERE pnumber1='$pnumber1'";
  		$res_e = mysqli_query($connect, $sql_e);
  		$res_p = mysqli_query($connect, $sql_p);

  	if (mysqli_num_rows($res_e) > 0) {
  	  $name_error = "Sorry... email already taken"; 	
  	  echo $name_error;
  	}else if(mysqli_num_rows($res_p) > 0){
  	  $email_error = "Sorry... phone already taken";
  	  echo $email_error; 	
  	}else{

	$INSERT="INSERT INTO ex(firstname,surname,othername,gender,dob,pob,age,lg,state,religion,address,pname,occupation,pnumber1,pnumber2,email,section,pword) values('$firstname','$surname','$othername','$gender','$dob','$pob','$age','$lg','$state','$religion','$address','$pname','$occupation','$pnumber1','$pnumber2','$email','$section','$pword')";

	//$results = mysqli_query($connect, $INSERT);
    //echo 'Saved';
      //     exit();
//}

	$input=mysqli_query($connect,$INSERT);
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