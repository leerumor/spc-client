<?php

include_once "maLibUtils.php";	// Car on utilise la fonction valider()
include_once "modele.php";	// Car on utilise la fonction connecterUtilisateur()

/**
 * @file login.php
 * Fichier contenant des fonctions de v�rification de logins
 */

/**
 * Cette fonction v�rifie si le login/passe pass�s en param�tre sont l�gaux
 * Elle stocke les informations sur la personne dans des variables de session : session_start doit avoir �t� appel�...
 * Infos � enregistrer : pseudo, idUser, heureConnexion, isAdmin
 * Elle enregistre l'�tat de la connexion dans une variable de session "connecte" = true
 * @pre login et passe ne doivent pas �tre vides
 * @param string $login
 * @param string $password
 * @return false ou true ; un effet de bord est la cr�ation de variables de session
 */
function verifUser($login,$password)
{
	
	$id = verifUserBdd($login,$password);

	if (!$id) return false; 

	// Cas succ�s : on enregistre pseudo, idUser dans les variables de session 
	// il faut appeler session_start ! 
	// Le controleur le fait d�j� !!
	$_SESSION["login"] = $login;
	$_SESSION["idUser"] = $id;
	$_SESSION["connecte"] = true;
	$_SESSION["heureConnexion"] = date("H:i:s");
	return true;
	
}

function createUser($login,$password)
{
	
	$id = createUserBdd($login,$password);

	if (!$id) return false; 

	// Cas succ�s : on enregistre pseudo, idUser dans les variables de session 
	// il faut appeler session_start ! 
	// Le controleur le fait d�j� !!
	$_SESSION["login"] = $login;
	$_SESSION["idUser"] = $id;
	$_SESSION["connecte"] = true;
	$_SESSION["heureConnexion"] = date("H:i:s");
	return true;
	
}


/**
 * Fonction � placer au d�but de chaque page priv�e
 * Cette fonction redirige vers la page $urlBad en envoyant un message d'erreur 
	et arr�te l'interpr�tation si l'utilisateur n'est pas connect�
 * Elle ne fait rien si l'utilisateur est connect�, et si $urlGood est faux
 * Elle redirige vers urlGood sinon
 */
function securiser($urlBad,$urlGood=false)
{
	if (! valider("connecte","SESSION")) {
		rediriger($urlBad);
		die("");
	}
	else {
		if ($urlGood)
			rediriger($urlGood);
	}
}

?>
