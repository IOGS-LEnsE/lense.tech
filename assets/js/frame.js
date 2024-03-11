/**
 * frame.js file
 *
 * Containing JS script for generating internal frames
 *
 * (c) Julien VILLEMEJANE / LEnsE / 2024
 */

/**
 *
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
		console.log('Not existing');
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
	mySubTitle.innerHTML = '<h1>'+title+'</h1>';
	
	const mySubDecription = mySubFrame.contentDocument.getElementById('frame-description');
	mySubDecription.innerHTML = description;
	
	// Descriptors
	var descriptors = infos[0].getElementsByTagName("Descriptor");
	
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
		el.innerHTML = desc + ' <a href="'+url+'">'+name+'</a>';
		el.style.background = document.documentElement.style.getPropertyValue('--'+page+'-light');
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
	
	/*	
	// Data from other subpages (non main)
	if(fileExists(fileNameData)){
		xmlString = readFile(fileNameData);
	}
	else{
		console.log('Not existing');
		return;
	}
	
	*/
	
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