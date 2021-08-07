<?php
// Подгружаем и активируем авто-загрузчик Twig-а
require_once "../api/sql-functions-lib.php";

try {
	// Разавторизовываем пользователя
	$_SESSION["isBeeJeeAuthorized"] = 0;
	
	// Отправляем на главную
	header("location: /beejee-test/");
} catch (Exception $e) {
  die ("ERROR: " . $e->getMessage());
}
?>