
function createMainMenu(){
	const myMainMenu = document.getElementById("mainmenu");
	console.log(myMainMenu);
	
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				var fileContent = xhr.responseText;
				const myMainMenuItems = fileContent.split('\n');
				
				for (const [index, value] of Object.values(myMainMenuItems).entries()) {
					const myMainMenuItem = value.split(':');
					console.log(myMainMenuItem[0]);
					console.log(myMainMenuItem[1]);
					
					el = document.createElement('li');
					el.innerHTML = '<a href="' + myMainMenuItem[1] + '">' + myMainMenuItem[0] + '</a>';
					myMainMenu.appendChild(el);
					
				}
				/*
				var index = 0;
				for (const key in myMainMenuItems) {
					if (myMainMenuItems.hasOwnProperty(key)) {
						console.log(`Index: ${index}, ${key}: ${myMainMenuItems[key]}`);
						index++;
					}
				}
				*/
				
				
				
			} else {
				console.error('Une erreur s\'est produite lors du chargement du fichier.');
			}
		}
	};
	xhr.open('GET', '../config/main_menu.txt', true);
	xhr.send();
}

/* Function execute at the beginning */
document.addEventListener("DOMContentLoaded", () => {
	createMainMenu();
	
	/*
	// Select the left menu
	var ulList = document.getElementById("mainmenu");
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
	*/
});