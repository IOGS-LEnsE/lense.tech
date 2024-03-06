
function sendToFrame(message) {
	var iframe = document.getElementById("frame-content");
	if (iframe && iframe.contentWindow) {
		iframe.contentWindow.postMessage(message, "*");
	}
}