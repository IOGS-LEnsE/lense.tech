var actualRGB = '';
var actualPage = '';
var actualTitle = '';
const violetIOGS = '10, 50, 80';

/**
 * readFile reads a txt file and returns its content
 * @param  {str} filePath Path to the file with its extension
 * @return {str}      content of the file
 */
function readFile(filePath) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, false); // Mode synchrone
    xhr.send(null);

    if (xhr.status === 200) {
        return xhr.responseText;
    } else {
        throw new Error('Impossible de lire le fichier : ' + filePath);
    }
}

/**
 * myMainMenuMouseOver is called when the mouse hovers over the main menu
 * 		The background of the main menu item is changed
 * @param  {event} event trigger
 */
function myMainMenuMouseOver(event){
	event.target.style.background = 'rgb(' + actualRGB + ')';	
}

/**
 * myMainMenuMouseOut is called when the mouse exits the main menu
 * 		The background of the main menu item is changed
 * @param  {event} event trigger
 */
function myMainMenuMouseOut(event){
	if(event.target.id == actualPage){
		event.target.style.background = 'white';
	}
	else{
		event.target.style.background = 'rgb(' + violetIOGS + ')';
	}
	
}

/**
 * myMainMenuClicked is called when the mouse clicks on an item of the main menu
 * 		A new page is loaded in the window
 * @param  {event} event trigger
 */
function myMainMenuClicked(event){
	if(event.target.id == 'index'){
		window.location.href = './index_content.html';
	}
	else{
		window.location.href = './content_main.html?'+event.target.id;	
	}
}

/**
 * createMainMenu creates the top menu of the page
 * @param  {str} fileContent content of the file
 *		Each line contains : { Name of the item:page_name:R,G,B: }
 */
function createMainMenu(fileContent, page){
	
	const myMainMenu = document.getElementById("mainmenu");
	const myMainMenuItems = fileContent.split('\n');
				
	// browse elements of the main_menu.txt file 
	for (const [index, value] of Object.values(myMainMenuItems).entries()) {
		// First line of the file is an header line 
		if(index != 0){
			// Each item of a line is separated by ':'
			const myMainMenuItem = value.split(':');
			// Create a LI element in the mainmenu UL
			el = document.createElement('li');
			
			if(page == myMainMenuItem[1]){
				el.classList.add("selected");
				actualTitle = myMainMenuItem[0];
				actualPage = myMainMenuItem[1];
				actualRGB = myMainMenuItem[2];
			}
			el.innerHTML = myMainMenuItem[0];
			el.id = myMainMenuItem[1];

			el.addEventListener('mouseover', myMainMenuMouseOver);
			el.addEventListener('mouseout', myMainMenuMouseOut);
			
			myMainMenu.appendChild(el);
		}
	}
}

/**
 * Main execution
 */
document.addEventListener("DOMContentLoaded", () => {
	var page = location.search.substring(1);
	// Create the Main Menu after reading the main_menu.txt file
	var fileContent = readFile('../config/main_menu.txt');
	createMainMenu(fileContent, page);
	
	// Update title
	const myMainTitle = document.getElementById("main-title");
	myMainTitle.style.background = 'rgb(' + actualRGB + ')';
	myMainTitle.innerHTML = '<h1>' + actualTitle + '</h1>';
	
	// 
	const myMainMenu = document.getElementById("mainmenu");
	myMainMenu.addEventListener("click", myMainMenuClicked);

});


	
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