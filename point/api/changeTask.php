<?php
// Загружаем функции нашей библиотеки
require_once "sql-functions-lib.php";

$text = $_POST["text"];
$status = $_POST["status"];
$id = $_POST["id"];

try {
	changeTask($text, $status, $id);
	
	$result = "success";
	
	echo($result);
} catch (Exception $e) {
  die ('ERROR: ' . $e->getMessage());
}
?>