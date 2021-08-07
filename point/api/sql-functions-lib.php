<?php
header("Content-Type: text/html; charset=utf-8");
require "db_connect.php";

session_start();

function myTasks($page, $sortParam, $sortDirection){
	$limit = ($page - 1) * 3;
	$mysqli = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME);
	mysqli_set_charset($mysqli, "utf8");
	
    $sql = "SELECT
                *
            FROM beejeetasks
			ORDER BY $sortParam $sortDirection
			LIMIT $limit, 3
			";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_connect_error());
    return dataBaseToArray($result);
}

function myUsers(){
	$mysqli = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME);
	mysqli_set_charset($mysqli, "utf8");
	
    $sql = "SELECT
                *
            FROM beejeeusers
			ORDER BY id
			";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_connect_error());
    return dataBaseToArray($result);
}

function getTasksCount(){
	$mysqli = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME);
	mysqli_set_charset($mysqli, "utf8");
	
	$sql = "SELECT
                COUNT(*)
            FROM beejeetasks
			";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_connect_error());
    return dataBaseToArray($result);
}

function createTask($user, $email, $text){
	$mysqli = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME);
	mysqli_set_charset($mysqli, "utf8");
	
	$arrInsert = array(
		"user" => mysqli_real_escape_string($mysqli, $user),
		"email" => mysqli_real_escape_string($mysqli, $email),
		"text" => mysqli_real_escape_string($mysqli, $text)
	);
	
    $sql = "INSERT INTO beejeetasks(" . implode(", ", array_keys($arrInsert)) . ")
							VALUES('". implode("','", $arrInsert) . "')";
    mysqli_query($mysqli, $sql) or die(mysqli_connect_error());
}

function changeTask($text, $status, $id){
	$mysqli = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME);
	mysqli_set_charset($mysqli, "utf8");
	
	$arrInsert = array(
		"text" => mysqli_real_escape_string($mysqli, $text),
		"status" => mysqli_real_escape_string($mysqli, $status),
		"id" => mysqli_real_escape_string($mysqli, $id)
	);
	
    $sql = "UPDATE beejeetasks set text = '" . $arrInsert["text"] . "', status = " . $arrInsert["status"] . 
	" WHERE id = " . $arrInsert["id"];
    mysqli_query($mysqli, $sql) or die(mysqli_connect_error());
}

function authorizeUser(){
	$_SESSION["isBeeJeeAuthorized"] = 1;
}

function dataBaseToArray($result){
    $array = array();
    while($row = mysqli_fetch_assoc($result)){
        $array[] = $row;
    }
    return $array;
}
?>