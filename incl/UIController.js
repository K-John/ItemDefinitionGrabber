var UIController = (function() {

	var DOMStrings = {
		startId: 'startid',
		endId: 'endid',
		files: 'files',
		alert: 'alert',
		startButton: 'start',
		progressWidth: 'progressbarwidth',
		progressText: 'progressbartext',
		statusText: 'statustext',
		filesUpdated: 'filesupdated'
	};

	return {

		getInputs: function() {

			return {
				startId: parseInt(document.getElementById(DOMStrings.startId).value),
				endId: parseInt(document.getElementById(DOMStrings.endId).value)
			}
		},

		addLoadedFiles: function(files) {

			var element = document.getElementById(DOMStrings.files);

			for (file of files) {
				var fileString = '<div class="ui label"><i class="file icon"></i> '+ file +'</div>';
				element.insertAdjacentHTML('afterbegin', fileString);
			}
		},

		addAlert: function (message) {

			var element = document.getElementById(DOMStrings.alert);
			var alert = '<div class="ui negative message" style="margin-bottom: 10px;"><div class="header">Uh oh!</div><p>'+ message +'</p></div>';

			element.insertAdjacentHTML('afterbegin', alert);
		},

		clearAlerts: function () {

			var element = document.getElementById(DOMStrings.alert);

			element.innerHTML = '';
		},

		setProgress: function(progress) {

			var barElement = document.getElementById(DOMStrings.progressWidth);
			var textElement = document.getElementById(DOMStrings.progressText);

			barElement.style.width = progress + "%";
			textElement.textContent = progress + "%";
		},

		updateButton: function() {

			var element = document.getElementById(DOMStrings.startButton);

			element.classList.remove('primary');
			element.classList.add('positive');
			element.textContent = 'Finished';
		},

		setStatus: function(status) {

			var element = document.getElementById(DOMStrings.statusText);

			element.textContent = status;
		},

		setFileUpdated: function(progress) {

			var element = document.getElementById(DOMStrings.filesUpdated);

			element.textContent = progress;
		}
	}
})();