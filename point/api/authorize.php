<?php
// Загружаем функции нашей библиотеки
require_once "sql-functions-lib.php";

$login = $_POST["login"];
$password = $_POST["password"];

try {
	// Получаем список пользователей
	$users = myUsers();
	
	$result = "error";
	
	foreach($users as $user) {
		if($user["login"] == $login && $user["password"] == $password){
			$result = "success";
		}
	}
	
	echo($result);
	
	if($result == "success"){
		authorizeUser();
	}
} catch (Exception $e) {
  die ('ERROR: ' . $e->getMessage());
}
?>