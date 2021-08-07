<?php
// Подгружаем и активируем авто-загрузчик Twig-а
require_once "../../lib/Twig/Autoloader.php";
require_once "../api/sql-functions-lib.php";
Twig_Autoloader::register();

try {
	// Указывает, где хранятся шаблоны
	$loader = new Twig_Loader_Filesystem("/templates/");

	// Инициализируем Twig
	$twig = new Twig_Environment($loader);

	// Подгружаем шаблон
	$template = $twig->loadTemplate("d/layouts/beejee-test-authorization.tpl");

	// Проверяем, авторизованы ли мы
	if($_SESSION["isBeeJeeAuthorized"] == 1){
		header("location: /beejee-test/");
	}

	// Передаём в шаблон переменные и значения
	// Выводим сформированное содержание
	echo $template->render(array(
		"layoutTPL" => "/templates/d/layouts/beejee-test-authorization.tpl",
		"title" => "Тестовое задание BeeJee",
		"favicon" => "/templates/d/blocks/beejee-test/favicon.ico",
	));

} catch (Exception $e) {
  die ("ERROR: " . $e->getMessage());
}
?>