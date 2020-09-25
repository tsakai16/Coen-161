(function () {
	var resources = "http://students.engr.scu.edu/~adiaztos/resources/";
	
	// Create an XMLHttpRequest object
	var xmlHttpObj = new XMLHttpRequest();

	// Handle succesful responses
	xmlHttpObj.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200)
			document.getElementById("sample1").innerHTML = this.responseText;
	}

	// Get sample1.php
	var sample1 = resources.concat("sample1.php");
	xmlHttpObj.open("GET", sample1, true);
	xmlHttpObj.send();


	// Create an XMLHttpRequest object
	var xmlHttpObj2 = new XMLHttpRequest();
	// Handle succesful responses
	xmlHttpObj2.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200)
			document.getElementById("sample2").innerHTML = this.responseText;
	
	}
	// Get sample2.php
	var sample2 = resources.concat("sample2.php");
	xmlHttpObj2.open("GET", sample2, true);
	xmlHttpObj2.send();

	// Create an XMLHttpRequest object
	var xmlHttpObj3 = new XMLHttpRequest();
	// Handle succesful responses
	xmlHttpObj3.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200){
			//convert
			var response = JSON.parse(this.responseText);
			//create ul and iterate thru array for li's
			var unOrList = document.createElement("ul");
			for(var i in response.friends){
				var unOrListItem = document.createElement("li");
				unOrListItem.innerHTML = response.friends[i].name;
				unOrList.appendChild(unOrListItem);
			}
			document.getElementById("sample3").appendChild(unOrList);

		}
	}
	// Get sample3.php
	var sample3 = resources.concat("sample3.php");
	xmlHttpObj3.open("GET", sample3, true);
	xmlHttpObj3.send();

})();