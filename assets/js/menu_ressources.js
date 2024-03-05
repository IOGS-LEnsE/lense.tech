
function printMainMenu(){
	const fs = require('fs')
	fs.readFile('../assets/config/main_menu.txt', (err, inputD) => {
	if (err) throw err;
		console.log(inputD.toString());
	})
}

document.addEventListener("DOMContentLoaded", function() {
	// Select the left menu
	var ulList = document.getElementById("mymenu");
	// Add an event listener on the mouse click
	ulList.addEventListener("click", function(event) {
		// Check if the clicked element is an <a>
		if (event.target.tagName === "A") {
			// Get all the <a> elements
			var listItems = Array.from(ulList.getElementsByTagName("a"));
			// Get the index of the clicked element
			var index = listItems.indexOf(event.target);
			
			console.log("Index de l'élément cliqué : " + index);
			
			if(index == 0){
				console.log('Main');
			}
		}
	});
});