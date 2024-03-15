
/**
 * lense.js file
 *
 * Containing JS script for lense.tech standard methods
 *
 * (c) Julien VILLEMEJANE / LEnsE / 2024
 */


/**
 * Main execution
 */
document.addEventListener("DOMContentLoaded", () => {
	var pages = location.search.substring(1);
	pages = pages.split('|');
	var page = pages[0];
	var subpage = '';
	if(Object.keys(pages).length == 2){
		subpage = pages[1];
	}
	
	// Create main colors rgb(10, 50, 80)
	document.documentElement.style.setProperty('--iogs-violet', 'rgb(10, 50, 80)');
	document.documentElement.style.setProperty('--iogs-violet-light', 'rgba(10, 50, 80, 0.7)');
	document.documentElement.style.setProperty('--iogs-orange', 'rgb(255, 150, 10)');
	document.documentElement.style.setProperty('--iogs-orange-light', 'rgba(255, 150, 10, 0.7)');
	
	// Create the Main Menu from main_menu.txt
	var mainMenuList = {};
	var mainRgbList = {};
	[mainMenuList, mainRgbList] = createMainMenu(page);
	const myMainMenu = document.getElementById("mainmenu");
	myMainMenu.addEventListener("click", myMainMenuClicked);
	
	// HTML Page title / Not working...
	myTitle = 'LEnsE.tech / ' + mainMenuList[page];
	document.title = myTitle;
	
	// Update title
	const myMainTitle = document.getElementById("main-title");
	myMainTitle.style.background = 'rgb(' + mainRgbList[page] + ')';
	myMainTitle.innerHTML = '<h1>' + mainMenuList[page] + '</h1>';
	
	// Create the Left Menu from page_menu.txt
	var leftMenuList = {};
	leftMenuList = createLeftMenu(page, subpage);
	const myLeftMenu = document.getElementById("leftmenu");
	myLeftMenu.addEventListener("click", myLeftMenuClicked);
	var mySubFrame = document.getElementById('content-frame');

	// To obtain the good colors on the index page of subsection
	// Waiting content frame loaded
	mySubFrame.addEventListener('load', function() {
		openFrame(page, 'return');
	});
});


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
 * fileExists returns if a file at the specified url exists
 * @param  {str} url Url to test
 * @return {bool}      content of the file
 */
function fileExists(url) {
    if(url){
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status==200;
    } else {
        return false;
    }
}

/**
 * parseXML ...
 * @param  {str} file Url to the XML file to parse
 * @return {str}      parsed content of the file
 */
function parseXML(file){
	xmlString = readFile(file);
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xmlString, "text/xml");
	return xmlDoc;
}