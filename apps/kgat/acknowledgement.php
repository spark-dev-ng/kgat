<!DOCTYPE html>
<html>
<head>
	<title>Acknowledgement</title>
</head>
<body>
	<CENTER><h1>Dr. Gwarzo Academy and Tahfeez</h1>
		<div class="site-logo">
            <a href="index.html" class="d-block">
              <img src="images/logog.jpg" alt="Image" class="img-fluid">
            </a>
          </div>
	<h1>ACKNOWLEDGEMENT</h1></CENTER>
</body>
</html>
<?php 
	$con=mysqli_connect("localhost","root","","gwarzo");
	if(!$con)
	{
		echo "Connection not estabished";
	}	

	$sql="select * from ex";
	$result=mysqli_query($con,$sql);

	
	echo "<center><table border='2'>
	<tr>
	<th>S/N</th>
	<th>Student Name</th>
	<th>Student Email</th>
	</tr>";
//echo "</table></center>";
	//while($row=mysqli_fetch_array($result))
		$row=mysqli_fetch_array($result);
		/*
		$id=$row[0];
		$name=$row[1];
		$surname=$row[7];
	*/
	
		if (mysqli_query($con, $sql)) {

		//$row=mysqli_fetch_array($result);

	//	echo "Id number: " . $id . "<br>" . "Name: " . $name . "<br>" . "Surname: " . $surname . "<br>";
	//}

	//{
		echo "<tr>";
		echo "<td>" . $row['id'] . "</td>";
		echo "<td>" . $row['firstname'] . "</td>";
		echo "<td>" . $row['pword'] . "</td>";
		echo "<tr>";
	}
	echo "</table></center>";
	mysqli_close($con);

?>
<html><br><center>
	<h4>You have been offered to study in Dr. Kabiru Gwarzo Academy. The session will commence on 19 August 2020.<br></h4><p>
		For: Dr. Kabiru Gwarzo</p>
	
	<input type="submit" value="Print" onclick="myFunction()">

	<script>
	function myFunction()
	{
  	window.print();
  }
</script>


</center></html>
