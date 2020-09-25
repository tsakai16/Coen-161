(function () {
	var template = document.getElementById("template");

	// remove template from the page, since it is only a template
	var parent = template.parentNode;
	parent.removeChild(template);

	// Create an XMLHttpRequest object
	var xHRO = new XMLHttpRequest();

	// Set onreadystatechange
	xHRO.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			var contacts = JSON.parse(this.responseText);
			poulateContacts(contacts);
		}
	}
	// Open and send requests
	xHRO.open("GET", "http://students.engr.scu.edu/~adiaztos/resources/contacts.php", true);
	xHRO.send();

	// This function takes the list of contacts and clones a new element from the template with the value of each contact
	function populateContacts(contacts) {
		for (var i in contacts){ //pretty sure i messed up this logic, since i understand everything else pretty well
			var node = template.cloneNode(true);

			var id = contacts[i].id;
			node.setAttribute("id",id);
			node.querySelector("#index").innerHTML = i;
			var uniqloId = node.id + i;
			node.querySelectorAll("#index").setAttribute("id", uniqloId);

			var name = contacts[i].name;
			node.querySelectorAll("input")[i].value = name;

			var email = contacts[i].email;
			node.querySelectorAll("input")[i].value = email;

			parent.appendChild(node);
		}
	}

	// submits a request with the search query for the filtered list of contacts
	function search() {
		// clear the current contacts list
		while (parent.lastChild)
			parent.removeChild(parent.lastChild);
		var name = document.getElementById("searchField").value;

		var orig = "http://students.engr.scu.edu/~adiaztos.resources/contacts.php?query="
		var mod = orig.concat(name);
		xHRO.open("GET", mod, true);
		xHRO.send();
	}

	// assign the search function as the click handler for search button
	document.getElementById("searchBtn").addEventListener("click", function() {
		search();
	})
})();