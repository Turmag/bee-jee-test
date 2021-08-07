<?php
// Загружаем функции нашей библиотеки
require_once "sql-functions-lib.php";

$user = $_POST["user"];
$email = $_POST["email"];
$text = $_POST["text"];

try {
	createTask($user, $email, $text);
	
	$result = "success";
	
	echo($result);
} catch (Exception $e) {
  die ('ERROR: ' . $e->getMessage());
}
?>