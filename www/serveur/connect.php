<?php

/* Конфигурация базы данных */

$db_host		= 'localhost';
$db_user		= 'popovski_phone';
$db_pass		= '1553991';
$db_database	= 'popovski_phone'; 

/* Конец секции */


$link = @mysql_connect($db_host,$db_user,$db_pass) or die('MySQL connection error....');

mysql_query("SET NAMES 'utf8'");
mysql_select_db($db_database,$link);

?>