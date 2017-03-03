<?php
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("librarysystem", $con);

$result = mysql_query("SELECT * FROM library");
$data = array();
while($row = mysql_fetch_array($result))
  {
  $innerarr = array('id'=>$row['id'],'\
  					book'=>$row['booktitle'],'\
  					code'=>$row['codenumber'],'\
					borrower'=>$row['borrower'],'\
					tel'=>$row['tel'],'\
					more'=>$row['more']);
  array_push($data, $innerarr); 
  }
echo json_encode($data);

mysql_close($con); 
?>