<?php
// Подгружаем и активируем авто-загрузчик Twig-а
require_once "../lib/Twig/Autoloader.php";
require_once "api/sql-functions-lib.php";
Twig_Autoloader::register();

try {
	// Указывает, где хранятся шаблоны
	$loader = new Twig_Loader_Filesystem("/templates/");

	// Инициализируем Twig
	$twig = new Twig_Environment($loader);

	// Подгружаем шаблон
	$template = $twig->loadTemplate("d/layouts/beejee-test.tpl");
	
	$page = 1;
	if(!empty($_GET["page"])){
		$page = $_GET["page"];
	}
	
	$sortParam = "id";
	if(!empty($_GET["sortparam"])){
		$sortParam = $_GET["sortparam"];
	}
	
	if($sortParam != "user" && $sortParam != "email" && $sortParam != "status"){
		$sortParam = "id";
	}
	
	$sortDirection = "ASC";
	if(!empty($_GET["sortdirection"])){
		$sortDirection = strtoupper($_GET["sortdirection"]);
	}
	
	$urlQuery = explode("?", $_SERVER["REQUEST_URI"]);
	
	$urlQuery = explode("&", $urlQuery[1]);
	$urlParams = [];
	foreach($urlQuery as $param){
		$paramInner = explode("=", $param);
		$paramKey = $paramInner[0];
		$paramValue = $paramInner[1];
		$urlParams[$paramKey] = $paramValue;
	}
	
	// Получаем список задач
	$tasks = myTasks($page, $sortParam, $sortDirection);
	
	$tasksCount = getTasksCount();
	$tasksCount = $tasksCount[0]["COUNT(*)"];

	$pagesCount = ceil($tasksCount / 3);

	// Смотрим, авторизованы ли мы в системе
	$isAuthorized = 0;
	if($_SESSION["isBeeJeeAuthorized"] == 1){
		$isAuthorized = 1;
	}

	// Передаём в шаблон переменные и значения
	// Выводим сформированное содержание
	echo $template->render(array(
		"layoutTPL" => "/templates/d/layouts/beejee-test.tpl",
		"title" => "Тестовое задание BeeJee",
		"favicon" => "/templates/d/blocks/beejee-test/favicon.ico",
		"tasks" => $tasks,
		"urlParams" => $urlParams,
		"page" => $page,
		"pagesCount" => $pagesCount,
		"sortParam" => $sortParam,
		"sortDirection" => $sortDirection,
		"isAuthorized" => $isAuthorized,
	));

} catch (Exception $e) {
  die ("ERROR: " . $e->getMessage());
}
?>