<?php
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("librarysystem", $con);
$id= $_REQUEST["id"];
$len = count($id);
for($i = 0;$i < $len;$i++)
{
$result = mysql_query("DELETE FROM library WHERE id=".$id[$i]);
}
	if($result){
	$result = array('status'=>'ok');
	echo json_encode($result);
 	}
 else{
 	$result = array('status'=>$len);
 	echo json_encode($result);
 	}
mysql_close($con);
?>