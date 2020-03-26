<?php
require('incl/FileManager.php');
?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<title>Item Definition Grabber</title>
	<link rel="stylesheet" type="text/css" href="incl/style.css">
	<script src="incl/UIController.js"></script>
</head>
<body>
	<div class="ui center aligned grid" style="margin-top: 40px;">
		<div class="column left aligned" style="width: 700px">
			<h1><i class="code icon"></i> Item Definition Grabber</h1>
			<div class="ui form style-box">
				<div class="ui message">
					<div class="header">
						Hey there,
					</div>
					<p>Let's grab some Item Definitions. To change the formatting, edit '<em>incl/Format.js</em>'. Update the data files in '<em>/data</em>' folder whenever necessary.</p>
				</div>
				<h4 class="ui dividing header">Status</h4>
				<div class="fields">
					<div class="three wide field">
						<label>Item Progress:</label>
					</div>
					<div class="thirteen wide field">
						<div class="ui progress">
							<div class="bar" id="progressbarwidth" style="width: 0%;">
								<div class="progress" id="progressbartext">0%</div>
							</div>
							<div class="label" id="statustext">N/A</div>
						</div>
					</div>
				</div>
				<div class="fields">
					<div class="three wide field">
						<label>File Last Updated:</label>
					</div>
					<div class="thirteen wide field" id="filesupdated">N/A</div>
				</div>
				<div class="fields">
					<div class="three wide field">
						<label>Data Files Loaded:</label>
					</div>
					<div class="thirteen wide field" id="files"></div>
				</div>
			</div>
			<h3>Application Controls</h3>
			<div class="ui form style-box">
				<h4 class="ui dividing header">Configuration</h4>
				<div id="alert"></div>
				<div class="fields">
					<div class="six wide field">
						<label for="startid">Start ID</label>
						<input type="number" name="startid" id="startid" placeholder="1 - 99999">
					</div>
					<div class="six wide field">
						<label for="endid">End ID</label>
						<input type="number" name="endid" id="endid" placeholder="1 - 99999">
					</div>
				</div>
				<h4 class="ui dividing header">Run Application</h4>
				<div class="fields">
					<div class="field">
						<button class="ui primary button" id="start"><i class="thumbs up icon"></i> Start</button>
						<button class="ui button disabled" id="stop">Stop</button>
					</div>
				</div>
			</div>
			<footer>Made with <i class="heart icon" style="margin-right: 0px;"></i> and <i class="coffee icon"></i> by <a href="https://github.com/K-John">Ken Johnson</a></footer>
		</div>
	</div>
</body>
<?php $files = FileManager::getFilesAsArray("./data");
echo '<script>var files = [];';
foreach ($files as $file) {
	echo 'files.push("'.$file.'");';
}
echo 'UIController.addLoadedFiles(files);</script>';
foreach ($files as $file) {
	echo '<script src="data/'.$file.'"></script>';
} ?>
<script src="incl/Format.js"></script>
<script src="incl/ItemDefGrabber.js"></script>
</html>