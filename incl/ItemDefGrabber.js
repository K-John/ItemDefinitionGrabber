var ItemDefGrabber = (function(UICtrl) {

	var finished = false;
	var startId = 0;
	var endId = 0;
	var currentId = 0;
	var dataArray = [];

	var start = function() {

		UICtrl.clearAlerts();
		var inputs = UICtrl.getInputs();

		if (!validate(inputs)) { UICtrl.addAlert("Your inputs must be numbers before we can proceed!"); return; }

		startId = inputs.startId;
		currentId = inputs.startId;
		endId = inputs.endId;
		dataArray = [];

		getData(startId);
	};

	var stop = function() {

		finished = true;
	}

	var validate = function(inputs) {

		for (input in inputs) {
			if (!Number.isInteger(inputs[input])) {
				return false;
			}
		}
		return true;
	};

	var postRequest = function(items, callback) {

		const Http = new XMLHttpRequest();

		Http.open('POST', 'post.php', true);

		Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		Http.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

				setTimeout(callback(Http.responseText), 2000);
			}
		};

		Http.send('items=' + items);
	};

	var getData = function(id) {

		if (finished) { return; }

		var item = itemData[id];

		// Exit Cases
		if (typeof item == "undefined") {
			currentId++;
			getData(currentId);
			return;
		}
		if (item.noted) {
			currentId++;
			getData(currentId);
			return;
		}

		//item.name
		if (item.name.includes("&")) {
			item.name = item.name.replace("&", "and");
		}

		//item.noted
		if (item.linked_id_noted) {
			item.noted = item.linked_id_noted;
		}

		// item.destroy
		if (destroyData[id].drop == "Destroy") {
			item.destroy = true;
		} else {
			item.destroy = false;
		}

		//item.cost
		if (item.tradeable_on_ge && typeof priceData[id] != "undefined") {
			item.cost = priceData[id].buy_average;
		}

		// item.untradeable
		if (item.tradeable) {
			item.untradeable = false;
		} else {
			item.untradeable = true;
		}

		// item.f2p
		if (item.members) {
			item.f2p = false;
		} else {
			item.f2p = true;
		}

		// item.mask
		if (item.name.includes("mask")) {
			item.mask = true;
		} else {
			item.mask = false;
		}

		// item.helm
		if (item.name.includes("helm")) {
			item.helm = true;
		} else {
			item.helm = false;
		}

		// item.fullbody
		if (item.equipment && item.equipment.slot == "body" && (item.name.includes("plate") || item.name.includes("torso"))) {
			item.fullbody = true;
		} else {
			item.fullbody = false;
		}

		// item.equipment
		if (!item.equipment) {
			item.equipment = {};
			item.equipment.attack_stab = 0;
			item.equipment.attack_slash = 0;
			item.equipment.attack_crush = 0;
			item.equipment.attack_magic = 0;
			item.equipment.attack_ranged = 0;
			item.equipment.defence_stab = 0;
			item.equipment.defence_slash = 0;
			item.equipment.defence_crush = 0;
			item.equipment.defence_magic = 0;
			item.equipment.defence_ranged = 0;
			item.equipment.melee_strength = 0;
			item.equipment.prayer = 0;
		}

		processItem(item);
	};

	var processItem = function(item) {

		dataArray.push(Format.fluxious(item));
		UICtrl.setStatus("Gathering Data");

		if (dataArray.length >= 10) {
			var progress = Math.round((currentId / endId) * 100);
			UICtrl.setProgress(progress);
			UICtrl.setFileUpdated(currentId);
			updateFile();

		} else if(currentId < endId) {

			currentId++;
			getData(currentId);

		} else {

			updateFile();
		}
	};

	var updateFile = function () {

		var items = dataArray.join("");

		console.log(currentId);

		postRequest(items, function(response) {

			if (response == "true") {

				dataArray = [];

				if (currentId < endId) {

					currentId++;
					getData(currentId);

				} else {

					UICtrl.setProgress('100');
					UICtrl.setStatus("Finished");
					UICtrl.setFileUpdated(endId);
					UICtrl.updateButton();
					stop();
				}

			} else {

				UICtrl.addAlert("There was an error saving the output file.");
				stop();
			}
		});
	};
	
	return {
		init: function() {

			document.getElementById('start').addEventListener('click', start);
			document.getElementById('stop').addEventListener('click', stop);
			document.getElementById('endid').value = itemData[Object.keys(itemData)[Object.keys(itemData).length - 1]].id;
		} 
	}
})(UIController);

ItemDefGrabber.init();