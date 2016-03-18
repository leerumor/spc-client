<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//include "connect.php";

$conn = new mysqli("localhost", "popovski_phone", "1553991", "popovski_phone");
$result = $conn->query("SELECT * FROM bouffe");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
   if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"date":"'   . $rs["date"]        . '",';
	$outp .= '"title":"'   . $rs["title"]        . '",';
	$outp .= '"thumb":"'   . $rs["thumb"]        . '",';
	$outp .= '"image":"'   . $rs["image"]        . '",';
	$outp .= '"type":"'   . $rs["type"]        . '",';
    $outp .= '"description":"'. $rs["description"]     . '"}'; 
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);

?>