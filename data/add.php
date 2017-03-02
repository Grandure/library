<?php
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("librarysystem", $con);

$book = $_REQUEST['book'];
$code = $_REQUEST['code'];
$borrower = $_REQUEST['borrower'];
$contact = $_REQUEST['contact'];
$more = $_REQUEST['more'];

$result = mysql_query("INSERT INTO `library`(`booktitle`, `codenumber`,`borrower`,`tel`,`more`) VALUES ('".$book."','".$code."','".$borrower."','".$contact."','".$more."')");
if($result){
	$result = array('status'=>"ok");
	echo json_encode($result);
}
else{
	$result = array('status'=>"error");
	echo json_encode($result);
}
mysql_close($con); 
?>