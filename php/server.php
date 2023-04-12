<?php
	$db = mysqli_connect('localhost', 'root', '', 'gym_registry');
	
	if(!$db)
	{
		//hibák kiiratása
		echo "Nem sikerült csatlakozni az adatbázishoz!<br>";
		echo "Hiba kódja: ".mysqli_connect_errno()."<br>";
		echo "Hiba: ".mysqli_connect_error()."<br>";
		die;
	}
	//utf-8-ra konvertálás
	mysqli_query($db,"set names utf8");
	mysqli_query($db,"set character set utf8");
?>