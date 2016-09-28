var counter = 0;
var but = document.getElementById('counter');
var count = document.getElementById('count');
but.onclick = function() {
	console.info("Pressed");
	//Make request object
	var request = new XMLHttpRequest();
	//Capture the response and store it in a variable
	request.onreadystatechange = function() {
		if(request.readystate === XMLHttpRequest.DONE && request.status == 200){
			//Do something
			counter = request.responseText;
			//Render it in span
			count.innerHTML = counter.toString();		
		}	
	};
	request.open("http://mathewthecoder.imad.hasura-app.io/counter", true);
	request.send(null);
};