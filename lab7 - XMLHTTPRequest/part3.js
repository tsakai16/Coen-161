(function () {
	// Add the click handler for the button
	$("button").click(function() {
		var change = $("input").val();
		allUpper(change);
		allLower(change);
		redText(change);
		flashyText(change);
	});

	function allUpper(change) {
		var changed = change.toUpperCase();
		$("#allUpper").text(changed);
	}

	function allLower(change) {
		var changed = change.toLowerCase();
		$("#allLower").text(changed);
	}

	function redText(change){
		$("#redText").text(change).css("color", "red");
	}
	
	function flashyText(change){
		var changed = change;
		$("#flashyText").text(changed);
		$("#flashyText").addClass("flashy");

	}

})();