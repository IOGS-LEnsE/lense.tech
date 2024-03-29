/**
 * frame.js file
 *
 * Containing JS script for generating internal frames
 *
 * (c) Julien VILLEMEJANE / LEnsE / 2024
 */

/**
 * openFrame update frame content depending on XML files
 *	if main page	
 *		page_info.xml	/ Information and description
 * 	if subpage
 * 		page_subpage_info.xml 	/ Information and description 
 * 		page_subpage.xml  		/ Items
 * @param  {str} page Name of the page to open in the frame
 * @param  {str} subpage Name of the subpage to open in the frame
 */
function openFrame(page, subpage){
	var fileNameInfo = '';
	var fileNameData = '';
	var xmlString = '';
	var is_main_subpage = false;
	
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
		const xmlDoc = parseXML(fileNameInfo);
		autoGenerateInfoStructure(page, subpage, xmlDoc);
	}
	else{
		var message = 'Page : '+page+'/'+subpage+' not yet implemented';
		createErrorPage(message, page);		
		return;
	}
	
	if(!is_main_subpage){
		// Data from other subpages (non main)
		if(fileExists(fileNameData)){
			const xmlDoc = parseXML(fileNameData);
			autoGenerateDataStructure(page, subpage, xmlDoc);
		}
		else{
			var message = 'Page : '+page+'/'+subpage+' not yet implemented';
			createErrorPage(message, page, mySubFrame, title=false);	
			return;
		}
	}
}

/**
 * autoGenerateInfoStructure update frame content depending on XML files
 *	if main page	
 *		page_info.xml	/ Information and description
 * 	if subpage
 * 		page_subpage_info.xml 	/ Information and description 
 *	each info.xml file contains :
 *		<Informations>
 *			<Title>
 *			<Description>
 *			<Descriptors> / process with processDescriptors method
 * @param  {str} page Name of the page to open in the frame
 * @param  {str} subpage Name of the subpage to open in the frame
 * @param  {str} xmlDoc parsed XML file content
 */
function autoGenerateInfoStructure(page, subpage, xmlDoc){
	// Informations
	var infos = xmlDoc.getElementsByTagName("Informations");
	var title = infos[0].querySelector("Title").textContent;
	var description = infos[0].querySelector("Description").textContent;
	// Containers
	var mySubFrame = document.getElementById('content-frame');	
	// Clear the HTML page
	const mySubItems = mySubFrame.contentDocument.getElementById('frame-items');
	mySubItems.innerHTML = '';
	// Title of the frame
	const mySubTitle = mySubFrame.contentDocument.getElementById('frame-title');
	mySubTitle.style.background = document.documentElement.style.getPropertyValue('--'+page);
	if(subpage.includes('return')){
		mySubTitle.style.display = 'None';
	}
	else{
		mySubTitle.style.display = 'block';
		mySubTitle.innerHTML = '<h1>'+title+'</h1>';
	}
	// Description of the frame
	const mySubDecription = mySubFrame.contentDocument.getElementById('frame-description');
	mySubDecription.innerHTML = description;
	
	// Descriptors
	var informations = xmlDoc.getElementsByTagName("Informations");
	if(subpage.includes('return')){
		processDescriptors(page, subpage, informations[0]);
	}
	else{
		//processDescriptorsData(page, subpage, informations[0]);
	}
}


/**
 * processDescriptors update frame content depending on XML files / Descriptors
 * 		each Descriptor contains:
 *			<Descriptor>
 *				<Type>
 *				<Desc>
 *				<Link>
 *					<Url>
 *					<Name>			
 * @param  {str} page Name of the page to open in the frame
 * @param  {str} subpage Name of the subpage to open in the frame
 * @param  {str} information parsed XML file content / First list of descriptors
 */
function processDescriptors(page, subpage, information){	
	// Descriptors
	var descriptors = information.getElementsByTagName("Descriptor");
	// Containers
	var mySubFrame = document.getElementById('content-frame');	
	const mySubItems = mySubFrame.contentDocument.getElementById('frame-items');

	mySubItems.innerHTML = '';
	
	if(descriptors.length > 0){
		// Create the div with class "sub-link"
		var subLink = document.createElement("div");
		subLink.classList.add("sub-link");

		// Read descriptors !
		for (var j = 0; j < descriptors.length; j++) {
			var descriptor = descriptors[j];
			
			// Create the div with class "sub-link-desc"
			var subLinkDesc = document.createElement("div");
			subLinkDesc.classList.add("sub-link-desc");	
		
			// Access descriptor properties
			var type = descriptor.querySelector("Type").textContent;
			var description = descriptor.querySelector("Desc").textContent;
			var url = descriptor.querySelector("Link > Url").textContent;
			var urlName = descriptor.querySelector("Link > Name").textContent;
			
			// Description of the descriptor			
			var desc = document.createElement("p");
			desc.classList.add("desc-info");
			desc.textContent = description;
			
			// Create the anchor element with class "gitlink"
			var anchorD = document.createElement("a");
			anchorD.style.background = document.documentElement.style.getPropertyValue('--'+page);
			// Change background with mouse entering or leaving the area
			anchorD.addEventListener("mouseenter", function( event ) {   
			  event.target.style.background = document.documentElement.style.getPropertyValue('--'+page+'-light');
			}, false);
			anchorD.addEventListener("mouseleave", function( event ) {   
			  event.target.style.background = document.documentElement.style.getPropertyValue('--'+page);
			}, false);
			
			// TO CHANGE !! FOR DIFFERENT TYPES !!
			anchorD.classList.add("link");
			switch(type){
				case 'GitHub':
					anchorD.classList.add("git");
					break;
				default:
					anchorD.classList.add("none");
					
			}
			anchorD.href = url;
			anchorD.target = "_blank";
			anchorD.textContent = urlName;

			subLinkDesc.appendChild(desc);
			subLinkDesc.appendChild(anchorD);
		}

		// Append sub-link-desc and sub-link-img to sub-link
		subLink.appendChild(subLinkDesc);
		//subLink.appendChild(subLinkImg);

		// Append sub-list to the body or any other parent element
		mySubItems.appendChild(subLink);
	}
}


/**
 * autoGenerateDataStructure update frame content depending on XML files
 * 	if subpage
 * 		page_subpage.xml 	/ Ressources
 *	each *.xml file contains :
 *		<Platforms>
 *			<Item>
 *				<Title>
 *				<Type>
 *				<Description>
 *				<Illustration> Name of the illustration with its extension
 *					image must be in contents/page/images/subpage/ directory.
 *				<Url>
 *				<Ressources> / process with processItems method
 * @param  {str} page Name of the page to open in the frame
 * @param  {str} subpage Name of the subpage to open in the frame
 * @param  {str} xmlDoc parsed XML file content
 */
function autoGenerateDataStructure(page, subpage, xmlDoc){
	// Collect Items
	var items = xmlDoc.getElementsByTagName("Item");
	
	// Iteration on items
	processItems(page, subpage, items);
}


/**
 * processItems update frame content depending on XML files / Items
 * 		each Item contains:
 *			<Item>
 *				<Title>
 *				<Type>
 *				<Description>
 *				<Illustration> Name of the illustration with its extension
 *					image must be in contents/page/images/subpage/ directory.
 *				<Url>
 *				<Ressources>  / process with processSubItems method
 *					<Resspource>
 *						<Type>
 *						<Title>
 *						<Url>		
 * @param  {str} page Name of the page to open in the frame
 * @param  {str} subpage Name of the subpage to open in the frame
 * @param  {str} items xmlDoc parsed XML file content / List of items
 */
function processItems(page, subpage, items){	
	// Containers
	var mySubFrame = document.getElementById('content-frame');	
	const mySubItems = mySubFrame.contentDocument.getElementById('frame-items');

	for(var k = 0; k < items.length; k++){
		item = items[k];
		
		// Create the div with class "sub-link"
		var subLink = document.createElement("div");
		subLink.classList.add("sub-link");
		subLink.classList.add("sub-link-data");

		subLink.style.background = document.documentElement.style.getPropertyValue('--'+page);
		// Change background with mouse entering or leaving the area
		subLink.addEventListener("mouseenter", function( event ) {   
		  event.target.style.background = document.documentElement.style.getPropertyValue('--'+page+'-light');
		}, false);
		subLink.addEventListener("mouseleave", function( event ) {   
		  event.target.style.background = document.documentElement.style.getPropertyValue('--'+page);
		}, false);

		var subLinkDesc = document.createElement("div");
		subLinkDesc.classList.add("sub-link-desc");

		// Access descriptor properties
		var title = item.querySelector("Title").textContent;
		var type = item.querySelector("Type").textContent;
		var description = item.querySelector("Description").textContent;
		var url = item.querySelector("Url").textContent;
		var illustration = item.querySelector("Illustration").textContent;
		
		// Create the anchor element with class "link"
		var anchorD = document.createElement("a");
		anchorD.classList.add("link");
		switch(type){
			case 'GitHub':
				anchorD.classList.add("git");
				break;
			default:
				anchorD.classList.add("none");
				
		}
		anchorD.href = url;
		anchorD.target = "_blank";
		anchorD.textContent = title;
		
		// Description of the descriptor			
		var desc = document.createElement("p");
		desc.classList.add("desc-info");
		desc.textContent = description;
		
		anchorD.appendChild(desc);
		subLinkDesc.appendChild(anchorD);
				
		// Append sub-link-desc to sub-link
		subLink.appendChild(subLinkDesc);
		// Append sub-link-img to sub-link
		if(illustration != ''){		
			subLinkDesc.classList.add("sub-link-desc-with-img");
			// Create the div with class "sub-link-img"
			var subLinkImg = document.createElement("div");
			subLinkImg.classList.add("sub-link-img");

			// Create the image element
			var imageD = document.createElement("img");
			imageD.src = "../../contents/"+page+"/images/"+subpage+"/"+illustration;
			imageD.alt = title+" Picture";
			subLinkImg.appendChild(imageD);
			subLink.appendChild(subLinkImg);
		}

		// Append sub-list to the body or any other parent element
		mySubItems.appendChild(subLink);
		
		processSubItems(page, subpage, subLinkDesc, item);
	}
}	

/**
 * processSubItems update frame content depending on XML files / SubItems
 * 		each SubItem contains:
 *			<Ressources>  / process with processSubItems method
 *				<Ressource>
 *					<Type>
 *					<Title>
 *					<Url>		
 * @param  {str} page Name of the page to open in the frame
 * @param  {str} subpage Name of the subpage to open in the frame
 * @param  {HTML object} subLinkDesc link-desc ID object (div)
 */
function processSubItems(page, subpage, subLinkDesc, item){
	var subItems = item.getElementsByTagName("Ressource");
		
	// Create the div with class "sub-links"
	var subLinks = document.createElement("div");
	subLinks.classList.add("sub-links");
	
	const anchorD = [];
	
	for(var j = 0; j < subItems.length; j++){
		subItem = subItems[j];
		
		// Access subItem properties
		var title = subItem.querySelector("Title").textContent;
		var url = subItem.querySelector("Url").textContent;
		var type = subItem.querySelector("TypeR").textContent;

		// Create the anchor element with class "link"
		anchorD[j] = document.createElement("a");
		anchorD[j].classList.add("link-sub");
		anchorD[j].classList.add("sub-"+type);

		anchorD[j].style.background = document.documentElement.style.getPropertyValue('--'+type);
		// Change background with mouse entering or leaving the area
		anchorD[j].addEventListener("mouseenter", function( event ) { 
			type = getTypeFromClass(event.target);
			event.target.style.background = document.documentElement.style.getPropertyValue('--'+type+'-light');
		}, false);
		anchorD[j].addEventListener("mouseleave", function( event ) {  
			type = getTypeFromClass(event.target); 
			event.target.style.background = document.documentElement.style.getPropertyValue('--'+type);
		}, false);

		anchorD[j].href = url;
		anchorD[j].target = "_blank";
		anchorD[j].textContent = title;		
		
		subLinks.appendChild(anchorD[j]);
		
	}	
	
	// Append sub-list to the body or any other parent element
	subLinkDesc.appendChild(subLinks);
}

/**
 *
 */
function getTypeFromClass(object){
	if(object.classList.contains('sub-ressources')){
		return 'ressources';
	}
	else if(object.classList.contains('sub-training')){
		return 'training';
	}
	else if(object.classList.contains('sub-platforms')){
		return 'platforms';
	}
	else if(object.classList.contains('sub-procedures')){
		return 'procedures';
	}
	else{
		return 'none';
	}
}
	

/**
 * createErrorPage update frame content with error description
 * @param  {str} message Message to display
 * @param  {str} page Name of the page 
 * @param  {frame} subFrame Frame object containing HTML objects
 * @param  {bool} title True if no title is already displayed, default=true
 */
function createErrorPage(message, page, subFrame=null, title=true) {
	// Containers
	var subFrame = document.getElementById('content-frame');
	// To clear the HTML page
	const mySubItems = subFrame.contentDocument.getElementById('frame-items');
	mySubItems.innerHTML = '';
	
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