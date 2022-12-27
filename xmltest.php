<?php
require("settings.php");


header('Content-Type: text/xml');
header('Cache-Control: no-cache');
header('Pragma: no-cache');
echo '<?xml version="1.0"?>';
echo '<response>';

$elrezu='unknown error';
@$con=mysqli_connect($db_host,$db_username,$db_password);
$sql="SHOW processlist";
$countemz=0;
if (@$result=mysqli_query($con,$sql))
{
	$elrezu='ok';
	while($row = mysqli_fetch_array($result))
	{
		$countemz++;
		//echo '<debug'.$countemz.'>'.$row['db']." ".$row['db']." ".htmlspecialchars($row['Info']).'</debug'.$countemz.'>';
	}
}
else
{$elrezu='DB error';}


echo '<howmanyinprocesslist>'.$countemz.'</howmanyinprocesslist>';
echo '<result>'.$elrezu.'</result>';
echo '</response>';

?>