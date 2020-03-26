<?php

require('incl/FileManager.php');

define('FILE_DIR', './output/');
define('FILE_NAME', 'item_definitions');

if ($_POST['items']) {

	$path = FILE_DIR ."". FILE_NAME. ".txt";

	if (file_exists($path)) {

		FileManager::writeToFile($_POST['items'], $path, 'a');

	} else {

		FileManager::writeToFile($_POST['items'], $path, 'w');
	}
} else {

	echo 'No items found.';
}