<?php
/* Адрес сервера */
define("DB_HOST", "localhost");
/* Логин для соединения с базой */
define("DB_LOGIN", "login");
/* Пароль для соединения с базой */
define("DB_PASSWORD", "password");
/* Имя базы данных */
define("DB_NAME", "dbname");
/* Устанавливаем соединение с сервером базы данных */
$connection = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME) or die("Не могу соединиться с сервером базы данных!");
?>