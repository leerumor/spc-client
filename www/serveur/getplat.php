<?php


// inclure ici la librairie faciliant les requêtes SQL
include_once("maLibSQL.pdo.php");

$SQL= "SELECT * FROM bouffe";
$arry=parcoursRs(SQLSelect($SQL));
$outp ='{"records":['.json_encode($arry).']}';

echo($outp);
?>