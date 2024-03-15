/**
 * frame.js file
 *
 * Containing JS script for generating internal frames
 *
 * (c) Julien VILLEMEJANE / LEnsE / 2024
 */

/**
 * openFrame update frame content depending on XML files
 * @param  {str} page Name of the page to open in the frame
 * @param  {str} subpage Name of the subpage to open in the frame
 */
function openFrame(page, subpage){
	var fileNameInfo = '';
	var fileNameData = '';
	var xmlString = '';
	var is_main_subpage = false;
	var mySubFrame = document.getElementById('content-frame');
	
	// main subsection page
	if (subpage.includes('return')){
		fileNameInfo = '../../contents/'+page+'/'+page+'_info.xml';
		is_main_subpage = true;
	}
	else{
		fileNameInfo = '../../contents/'+page+'/'+page+'_'+subpage+'_info.xml';
		fileNameData = '../../contents/'+page+'/'+page+'_'+subpage+'.xml';
		is_main_subpage = false;
	}	
	// Test if informations file exists
	if(fileExists(fileNameInfo)){
		xmlString = readFile(fileNameInfo);
	}
	else{
		var message = 'Page : '+page+'/'+subpage+' not yet implemented';
		createErrorPage(message, page, mySubFrame);		
		return;
	}

	// Informations
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xmlString, "text/xml");
	var infos = xmlDoc.getElementsByTagName("Informations");
	
	var title = infos[0].querySelector("Title").textContent;
	var description = infos[0].querySelector("Description").textContent;
	
	const mySubTitle = mySubFrame.contentDocument.getElementById('frame-title');
	mySubTitle.style.background = document.documentElement.style.getPropertyValue('--'+page);
	if(is_main_subpage){
		mySubTitle.style.display = 'None';
	}
	else{
		mySubTitle.style.display = 'block';
		mySubTitle.innerHTML = '<h1>'+title+'</h1>';
	}
	const mySubDecription = mySubFrame.contentDocument.getElementById('frame-description');
	mySubDecription.innerHTML = description;
	
	// Descriptors
	var descriptors = infos[0].getElementsByTagName("Descriptor");
	
	const mySubItems = mySubFrame.contentDocument.getElementById('frame-items');
	autoGenerateInfoStructure(mySubItems, descriptors, page);
	
	/*
	
	const myContentItems = mySubFrame.contentDocument.getElementById("content-item");
	myContentItems.innerHTML = '';
		
	for (var j = 0; j < descriptors.length; j++) {
		var descriptor = descriptors[j];
		el = document.createElement('li');
		// Access descriptor properties
		var type = descriptor.querySelector("Type").textContent;
		var desc = descriptor.querySelector("Desc").textContent;
		var url = descriptor.querySelector("Link > Url").textContent;
		var name = descriptor.querySelector("Link > Name").textContent;
		// Create the element
		ael = document.createElement('a');
		// Create the text node for anchor element.
		var linke = document.createTextNode(name);
		// Append the text node to anchor element.
		ael.appendChild(linke); 
		ael.title = name;
		ael.href = url;
		ael.style.background = document.documentElement.style.getPropertyValue('--iogs-violet');
		el.innerHTML = desc+'<br />';
		el.append(ael);
		el.style.background = document.documentElement.style.getPropertyValue('--'+page);
		// Add the element into the list
		myContentItems.appendChild(el);
		
	}
	
	/*
	
	    // Parse the XML string
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Accessing XML nodes
    var informations = xmlDoc.getElementsByTagName("Informations");

    // Loop through each Informations element
    for (var i = 0; i < informations.length; i++) {
        var information = informations[i];
        
        // Access information properties
        var title = information.querySelector("Title").textContent;
        var description = information.querySelector("Description").textContent;
        console.log("Information Title:", title);
        console.log("Information Description:", description);

        // Access Descriptors for each Informations element
        var descriptors = information.getElementsByTagName("Descriptor");
        
        // Loop through each descriptor
        for (var j = 0; j < descriptors.length; j++) {
            var descriptor = descriptors[j];

            // Access descriptor properties
            var type = descriptor.querySelector("Type").textContent;
            var desc = descriptor.querySelector("Desc").textContent;
            var url = descriptor.querySelector("Link > Url").textContent;
            var name = descriptor.querySelector("Link > Name").textContent;

            // Log descriptor details
            console.log("Type:", type);
            console.log("Description:", desc);
            console.log("URL:", url);
            console.log("Name:", name);
            console.log("--------------------------------");
        }
    }
	
	*/
	
	
	if(is_main_subpage){
		// Data from other subpages (non main)
		if(fileExists(fileNameData)){
			xmlString = readFile(fileNameData);
		}
		else{
			var message = 'Page : '+page+'/'+subpage+' not yet implemented';
			createErrorPage(message, page, mySubFrame, title=false);	
			return;
		}
	}
	
	// TO COMPLETE

	/*
    // Loop through each 'Informations' node
    for (var i = 0; i < infos.length; i++) {
        var title = infos[i].querySelector("Title").textContent;
        var description = infos[i].querySelector("Description").textContent;

        // Log the title and description for each 'Informations' node
        console.log("Title:", title);
        console.log("Description:", description);
    }
	*/
}

function autoGenerateInfoStructure(frameItemsObject, descriptors, page){
	console.log("AutoGen");
	frameItemsObject.innerHTML = '';
	// Create the div with class "sub-link"
	var subLink = document.createElement("div");
	subLink.classList.add("sub-link");
	subLink.style.background = document.documentElement.style.getPropertyValue('--'+page);
	// Change background with mouse entering or leaving the area
	subLink.addEventListener("mouseenter", function( event ) {   
	  event.target.style.background = document.documentElement.style.getPropertyValue('--'+page+'-light');
	}, false);
	subLink.addEventListener("mouseleave", function( event ) {   
	  event.target.style.background = document.documentElement.style.getPropertyValue('--'+page);
	}, false);
	
	// Create the div with class "sub-link-desc"
	var subLinkDesc = document.createElement("div");
	subLinkDesc.classList.add("sub-link-desc");

	// Create the inner div
	var innerDiv = document.createElement("div");

	// Create the anchor element with class "gitlink"
	var anchorD = document.createElement("a");
	
	// Read descriptors !
	for (var j = 0; j < descriptors.length; j++) {
		var descriptor = descriptors[j];
		el = document.createElement('li');
		// Access descriptor properties
		var type = descriptor.querySelector("Type").textContent;
		var desc = descriptor.querySelector("Desc").textContent;
		var url = descriptor.querySelector("Link > Url").textContent;
		var urlName = descriptor.querySelector("Link > Name").textContent;
		
		// Create the paragraph element with class "desc"
		var desc = document.createElement("p");
		desc.classList.add("desc");
		desc.textContent = desc;
		
		console.log('ERREUR AVEC AFFICHAGE DESC');
		// Append paragraph to anchor
		anchorD.appendChild(desc);
		
		// TO CHANGE !! FOR DIFFERENT TYPES !!
		anchorD.classList.add("gitlink");
		
		anchorD.href = url;
		anchorD.target = "_blank";
		anchorD.textContent = urlName;
		
	}

	
	// Append anchor to inner div
	innerDiv.appendChild(anchorD);

	// Append inner div to sub-link-desc
	subLinkDesc.appendChild(innerDiv);

	/*
	// Create the div with class "sub-links"
	var subLinks = document.createElement("div");
	subLinks.classList.add("sub-links");

	// Create the anchor elements for sub-links
	var cameraInterface = document.createElement("a");
	cameraInterface.classList.add("sub-ressources", "gitlink");
	cameraInterface.href = "https://iogs-lense-ressources.github.io/camera-gui/";
	cameraInterface.target = "_blank";
	cameraInterface.textContent = "Camera Interfaces (Basler, IDS...)";

	var nucleoBasics = document.createElement("a");
	nucleoBasics.classList.add("sub-training", "gitlink");
	nucleoBasics.href = "https://iogs-lense-training.github.io/nucleo-basics/";
	nucleoBasics.target = "_blank";
	nucleoBasics.textContent = "Nucleo Basics";

	var pythonGUI = document.createElement("a");
	pythonGUI.classList.add("sub-training", "gitlink");
	pythonGUI.href = "#"; // Add your link for Python GUI
	pythonGUI.target = "_blank";
	pythonGUI.textContent = "Python GUI";

	// Append anchor elements to sub-links
	subLinks.appendChild(cameraInterface);
	subLinks.appendChild(nucleoBasics);
	subLinks.appendChild(pythonGUI);

	// Append sub-links to sub-link-desc
	subLinkDesc.appendChild(subLinks);

	// Create the div with class "sub-link-img"
	var subLinkImg = document.createElement("div");
	subLinkImg.classList.add("sub-link-img");

	// Create the image element
	var image = document.createElement("img");
	image.src = "./platforms/machine-vision.png";
	image.alt = "Machine Vision Picture";
	
	// Append image to sub-link-img
	subLinkImg.appendChild(image);
	*/
	// Append sub-link-desc and sub-link-img to sub-link
	subLink.appendChild(subLinkDesc);
	//subLink.appendChild(subLinkImg);

	// Append sub-list to the body or any other parent element
	frameItemsObject.appendChild(subLink);

}


function autoGenerateDataStructure(frameItemsObject, descriptors, page){
	console.log("AutoGenData");
	// Create the div with class "sub-link"
	var subLink = document.createElement("div");
	subLink.classList.add("sub-link");
	subLink.style.background = document.documentElement.style.getPropertyValue('--'+page);
	// Change background with mouse entering or leaving the area
	subLink.addEventListener("mouseenter", function( event ) {   
	  event.target.style.background = document.documentElement.style.getPropertyValue('--'+page+'-light');
	}, false);
	subLink.addEventListener("mouseleave", function( event ) {   
	  event.target.style.background = document.documentElement.style.getPropertyValue('--'+page);
	}, false);
	
	// Create the div with class "sub-link-desc"
	var subLinkDesc = document.createElement("div");
	subLinkDesc.classList.add("sub-link-desc");

	// Create the inner div
	var innerDiv = document.createElement("div");

	// Create the anchor element with class "gitlink"
	var anchorD = document.createElement("a");
	
	// Read descriptors !
	for (var j = 0; j < descriptors.length; j++) {
		var descriptor = descriptors[j];
		el = document.createElement('li');
		// Access descriptor properties
		var type = descriptor.querySelector("Type").textContent;
		var desc = descriptor.querySelector("Desc").textContent;
		var url = descriptor.querySelector("Link > Url").textContent;
		var urlName = descriptor.querySelector("Link > Name").textContent;
		
		
		// TO CHANGE !! FOR DIFFERENT TYPES !!
		anchorD.classList.add("gitlink");
		
		anchorD.href = url;
		anchorD.target = "_blank";
		anchorD.textContent = urlName;
		
	}
	// Create the paragraph element with class "desc"
	var desc = document.createElement("p");
	desc.classList.add("desc");
	desc.textContent = desc;
	
	// Append paragraph to anchor
	anchorD.appendChild(desc);
	
	// Append anchor to inner div
	innerDiv.appendChild(anchorD);

	// Append inner div to sub-link-desc
	subLinkDesc.appendChild(innerDiv);

	/*
	// Create the div with class "sub-links"
	var subLinks = document.createElement("div");
	subLinks.classList.add("sub-links");

	// Create the anchor elements for sub-links
	var cameraInterface = document.createElement("a");
	cameraInterface.classList.add("sub-ressources", "gitlink");
	cameraInterface.href = "https://iogs-lense-ressources.github.io/camera-gui/";
	cameraInterface.target = "_blank";
	cameraInterface.textContent = "Camera Interfaces (Basler, IDS...)";

	var nucleoBasics = document.createElement("a");
	nucleoBasics.classList.add("sub-training", "gitlink");
	nucleoBasics.href = "https://iogs-lense-training.github.io/nucleo-basics/";
	nucleoBasics.target = "_blank";
	nucleoBasics.textContent = "Nucleo Basics";

	var pythonGUI = document.createElement("a");
	pythonGUI.classList.add("sub-training", "gitlink");
	pythonGUI.href = "#"; // Add your link for Python GUI
	pythonGUI.target = "_blank";
	pythonGUI.textContent = "Python GUI";

	// Append anchor elements to sub-links
	subLinks.appendChild(cameraInterface);
	subLinks.appendChild(nucleoBasics);
	subLinks.appendChild(pythonGUI);

	// Append sub-links to sub-link-desc
	subLinkDesc.appendChild(subLinks);

	// Create the div with class "sub-link-img"
	var subLinkImg = document.createElement("div");
	subLinkImg.classList.add("sub-link-img");

	// Create the image element
	var image = document.createElement("img");
	image.src = "./platforms/machine-vision.png";
	image.alt = "Machine Vision Picture";
	
	// Append image to sub-link-img
	subLinkImg.appendChild(image);
	*/
	// Append sub-link-desc and sub-link-img to sub-link
	subLink.appendChild(subLinkDesc);
	//subLink.appendChild(subLinkImg);

	// Append sub-list to the body or any other parent element
	frameItemsObject.appendChild(subLink);

}


/**
 * createErrorPage update frame content with error description
 * @param  {str} message Message to display
 * @param  {str} page Name of the page 
 * @param  {frame} subFrame Frame object containing HTML objects
 * @param  {bool} title True if no title is already displayed, default=true
 */
function createErrorPage(message, page, subFrame=null, title=true) {
	console.log(message);
	
	if(subFrame != null){
		const mySubTitle = subFrame.contentDocument.getElementById('frame-title');
		if(title){
			mySubTitle.style.background = document.documentElement.style.getPropertyValue('--'+page);
			mySubTitle.style.display = 'block';
			mySubTitle.innerHTML = '<h1>Not Yet...</h1>';
		}
		const myFrameDesc = subFrame.contentDocument.getElementById('frame-description');
		myFrameDesc.innerHTML = message;
	}
}