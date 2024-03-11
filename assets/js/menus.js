/**
 * menus.js file
 *
 * Containing JS script for generating menus
 *
 * (c) Julien VILLEMEJANE / LEnsE / 2024
 */

var actualRGB = '';
var actualPage = '';
const violetIOGS = '10, 50, 80';

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
		window.location.href = './content_main.html?'+event.target.id+'|';
	}
}

/**
 * createMainMenu creates the top menu of the page
 * 		Each line of the main_menu.txt contains : 
 *			{ Name of the item:page_name:R,G,B: }
 * @param  {str} page name of the page to open
 */
function createMainMenu(page){
	var mainMenuList = {};
	var mainRgbList = {};
	const myMainMenu = document.getElementById("mainmenu");
	
	var fileContent = readFile('../../contents/menu/main_menu.txt');
	const myMainMenuItems = fileContent.split('\n');
				
	// browse elements of the main_menu.txt file 
	for (const [index, value] of Object.values(myMainMenuItems).entries()) {
		// First line of the file is an header line 
		if(index != 0){
			// Each item of a line is separated by ':'
			const myMainMenuItem = value.split(':');
			mainMenuList[myMainMenuItem[1]] = myMainMenuItem[0];
			mainRgbList[myMainMenuItem[1]] = myMainMenuItem[2];
			// Set the root variables - COLOR
			document.documentElement.style.setProperty('--'+myMainMenuItem[1]+'', 'rgb('+myMainMenuItem[2]+')');
			document.documentElement.style.setProperty('--'+myMainMenuItem[1]+'-light', 'rgba('+myMainMenuItem[2]+', 0.7)');			
			
			console.log('COLOR OK');
			
			// Create a LI element in the mainmenu UL
			el = document.createElement('li');
			
			if(page == myMainMenuItem[1]){
				// Add a LI element to the menu list
				el.classList.add("selected");
				actualRGB = myMainMenuItem[2];
				actualPage = myMainMenuItem[1];
			}
			el.innerHTML = myMainMenuItem[0];
			el.id = myMainMenuItem[1];

			el.addEventListener('mouseover', myMainMenuMouseOver);
			el.addEventListener('mouseout', myMainMenuMouseOut);
			
			myMainMenu.appendChild(el);
		}
	}
	return [mainMenuList, mainRgbList];
}

/**
 * myLeftMenuMouseOver is called when the mouse hovers over the left menu
 * 		The background of the left menu item is changed
 * @param  {event} event trigger
 */
function myLeftMenuMouseOver(event){
	if(event.target.id.includes('return')){
		event.target.style.color = 'var(--iogs-violet)';
	}
	else{
		event.target.style.background = 'var(--iogs-violet)';
		event.target.style.color = 'white'; 
	}
}

/**
 * myLeftMenuMouseOut is called when the mouse exits the left menu
 * 		The background of the left menu item is changed
 * @param  {event} event trigger
 */
function myLeftMenuMouseOut(event){
	if(event.target.id.includes('return')){
		event.target.style.background = 'lightgray';
		event.target.style.color = 'var(--iogs-violet)';
	}
	else{
		if(event.target.classList.contains('returned')){
			event.target.style.background = 'lightgray';
			event.target.style.color = 'var(--iogs-violet)';
		}
		else{
			event.target.style.background = 'var(--'+actualPage+')';
		}
	}
}

/**
 * myLeftMenuClicked is called when the mouse clicks on an item of the left menu
 * 		A new page is loaded in the window
 * @param  {event} event trigger
 */
function myLeftMenuClicked(event){
	var pages = event.target.id.split('|');
	var page = pages[0];
	var subpage = '';
	if(Object.keys(pages).length == 2){
		subpage = pages[1];
	}
	// Open Subpage in the frame
	if (typeof subpage === "string" && subpage.length !== 0) {
		openFrame(page, subpage);
	}
}

/**
 * createLeftMenu creates the left menu of the page
 * 		Each line of the page_menu.txt contains : 
 *			{ Name of the item:page_name: }
 * @param  {str} page name of the page to open
 */
function createLeftMenu(page, subpage){
	var leftMenuList = {};
	var fileMenu = '../../contents/menu/' + page + '_menu.txt';
	const myLeftMenu = document.getElementById("leftmenu");
	
	var fileContent = readFile(fileMenu);
	const myLeftMenuItems = fileContent.split('\n');
				
	// browse elements of the main_menu.txt file 
	for (const [index, value] of Object.values(myLeftMenuItems).entries()) {
		// First line of the file is an header line 
		if(index != 0){
			// Each item of a line is separated by ':'
			const myLeftMenuItem = value.split(':');
			leftMenuList[myLeftMenuItem[1]] = myLeftMenuItem[0];
			
			// Create a LI element in the mainmenu UL
			el = document.createElement('li');
			if(myLeftMenuItem[1] == 'return'){
				el.classList.add("return");
			}
			else{
				if(myLeftMenuItem[1] == subpage){
					el.classList.add("returned");				
				}
				el.style.background = 'var(--'+actualPage+')';
			}
			el.innerHTML = myLeftMenuItem[0];
			el.id = page+'|'+myLeftMenuItem[1];
			
			el.addEventListener('mouseover', myLeftMenuMouseOver);
			el.addEventListener('mouseout', myLeftMenuMouseOut);
			
			myLeftMenu.appendChild(el);
		}
	}
	return leftMenuList;
}
