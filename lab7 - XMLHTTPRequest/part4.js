(function () {
	var resources = "http://students.engr.scu.edu/~adiaztos/resources/";

	// Load sample1.php
	var samp1 = resources.concat("sample1.php");
	$("#sample1").load(samp1);

	// Load sample2.php
	var samp2 = resources.concat("sample2.php");
	$("#sample2").load(samp2);

	// Get sample3.php
	var samp3 = resources.concat("sample3.php");
	$.get(samp3, function(data, status){
		var response = JSON.parse(data);

		var ul = $("<ul></ul>");
		for (var i in response.friends){
			var li = $("<li></li>");
			li.text(response.friends[i].name);
			ul.append(li);
		}
		$("#sample3").append(ul);
	});


})();