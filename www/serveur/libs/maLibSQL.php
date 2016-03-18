<?php

include_once "config.php";

/**
 * @file maLibSQL.php
 * Ce fichier définit les fonctions de requêtage
 * Il nécessite d'avoir défini les variables $BDD_login, $BDD_password $BDD_chaine dans config.php, qui est chargé au moment de l'appel de la librairie
 * @note Pour accélérer les traitements, les requêtes aux bases de données seront persistantes : on ne les fermera pas à chaque fin de requête. 
 * On utilise pour cela la fonction pconnect
 * @todo On pourrait tracer les requêtes dans une table de logs
 */


/**
 * Exécuter une requête UPDATE. Renvoie le nb de modifs ou faux si pb
 * On testera donc avec === pour différencier faux de 0 
 * @return le nombre d'enregistrements affectés, ou false si pb...
 * @param string $sql
 * @pre Les variables  $BDD_login, $BDD_password $BDD_chaine doivent exister
 */
function SQLUpdate($sql)
{
	global $BDD_host;
	global $BDD_base;
	global $BDD_user;
	global $BDD_password;

	mysql_connect($BDD_host, $BDD_user,$BDD_password) or die("<font color=\"red\">SQLUpdate/Delete: Erreur de connexion : " . mysql_error() . "</font>");
	mysql_set_charset('utf8');
	mysql_select_db($BDD_base) or die ("<font color=\"red\">SQLUpdate/Delete: Erreur select db : " . mysql_error() . "</font>");
	mysql_query($sql) or die("SQLUpdate/Delete: Erreur sur la requete : <font color=\"red\">$sql</font>");
	
	$nb = mysql_affected_rows();
	if ($nb != -1) return $nb;
	else return false;
	
}

// Un delete c'est comme un Update
function SQLDelete($sql) {return SQLUpdate($sql);}


/**
 * Exécuter une requête INSERT 
 * @param string $sql
 * @pre Les variables  $BDD_login, $BDD_password $BDD_chaine doivent exister
 * @return Renvoie l'insert ID ... utile quand c'est un numéro auto
 */
function SQLInsert($sql)
{
	global $BDD_host;
	global $BDD_base;
	global $BDD_user;
	global $BDD_password;
	
	mysql_connect($BDD_host,$BDD_user,$BDD_password) or die("<font color=\"red\">SQLInsert: Erreur de connexion : " . mysql_error() . "</font>");
	mysql_set_charset('utf8');
	mysql_select_db($BDD_base) or die ("<font color=\"red\">SQLInsert: Erreur select db : " . mysql_error() . "</font>");
	
	$rs = mysql_query($sql) or die("SQLInsert: Erreur sur la requete : <font color=\"red\">$sql" . "|". mysql_error() . "</font>");
	
	if ($rs) return mysql_insert_id();
	else return false;
		
}



/**
* Effectue une requete SELECT dans une base de données SQL SERVER, pour récupérer uniquement un champ (la requete ne doit donc porter que sur une valeur)
* Renvoie FALSE si pas de resultats, ou la valeur du champ sinon
* @pre Les variables  $BDD_login, $BDD_password $BDD_chaine doivent exister
* @param string $SQL
* @return false|string
*/
function SQLGetChamp($sql)
{
	global $BDD_host;
	global $BDD_base;
	global $BDD_user;
	global $BDD_password;

	mysql_connect($BDD_host,$BDD_user,$BDD_password) or die("<font color=\"red\">SQLGetChamp: Erreur de connexion : " . mysql_error() . "</font>");
	mysql_set_charset('utf8');
	mysql_select_db($BDD_base) or die ("<font color=\"red\">SQLGetChamp: Erreur select db : " . mysql_error() . "</font>");
 
	$rs = mysql_query($sql) or die("SQLGetChamp: Erreur sur la requete : <font color=\"red\">$sql</font>");
	$num = mysql_num_rows($rs);
	
	// On pourrait utiliser mysql_fetch_field() ??
	
	if ($num==0) return false;
	
	$ligne = mysql_fetch_row($rs);
	if ($ligne == false) return false;
	else return $ligne[0];

}

/**
 * Effectue une requete SELECT dans une base de données SQL SERVER
 * Renvoie FALSE si pas de resultats, ou la ressource sinon
 * @pre Les variables  $BDD_login, $BDD_password $BDD_chaine doivent exister
 * @param string $SQL
 * @return boolean|resource
 */
function SQLSelect($sql)
{	
 	global $BDD_host;
	global $BDD_base;
 	global $BDD_user;
 	global $BDD_password;
	
 	mysql_connect($BDD_host,$BDD_user,$BDD_password) or die("<font color=\"red\">SQLSelect: Erreur de connexion : " . mysql_error() . "</font>");
	mysql_set_charset('utf8');
 	mysql_select_db($BDD_base) or die ("<font color=\"red\">SQLSelect: Erreur select db : " . mysql_error() . "</font>");

	$rs = mysql_query($sql) or die("SQLSelect: Erreur sur la requete : <font color=\"red\">$sql" . "|" .  mysql_error() . "</font>");
	$num = mysql_num_rows($rs);
	if ($num==0) return false;
	else return $rs;
}

/**
*
* Parcours les enregistrements d'un résultat mysql et les renvoie sous forme de tableau associatif
* On peut ensuite l'afficher avec la fonction print_r, ou le parcourir avec foreach
* @param resultat_Mysql $result
*/
function parcoursRs($result)
{
	if  ($result == false) return array();

	while ($ligne = mysql_fetch_assoc($result)) 
		$tab[]= $ligne;

	return $tab;
}


/* Il y a sans doute moyen de faire mieux...
	Il faut juste exécuter mysql_query("SET NAMES UTF8"); avant chaque requête... 
	Mieux d'après php.net : mysql_set_charset('utf8')
 */
function my_utf8_encode(&$val,$cle)
{
	if (is_array($val))
		$val = utf8_encode_r($val);
	else{
		$val = utf8_encode($val);
	}
}
function utf8_encode_r($tab)
{
	// On pourrait passer $tab par référence...
	array_walk ($tab, 'my_utf8_encode');
	return $tab; 
}






















?>
