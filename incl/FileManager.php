<?php

class FileManager {

	public static function getFilesAsArray(string $directory) {

		return array_diff(scandir($directory, 1), array('..', '.'));
	}

	public static function writeToFile(string $items, string $path, string $type) {
	
		$file = fopen($path, $type) or die('Error opening file.');

		fwrite($file, $items);
		fclose($file);

		echo 'true';
	}
}