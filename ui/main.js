
var but = document.getElementById('counter');

but.onclick = function() {
	console.info("Pressed");
	//Make request object
	var request = new XMLHttpRequest();
	//Capture the response and store it in a variable
	request.onreadystatechange = function() {
		console.warn(request.readystate);
		if(request.readystate === XMLHttpRequest.DONE){
			//Do something
			console.warn(request.status);
			if(request.status === 200){
				console.info("Ready");
				var counter = request.responseText;
				var count = document.getElementById('count');
				//Render it in span
				count.innerHTML = counter.toString();
			}		
		}	
	};
	request.open('GET',"http://mathewthecoder.imad.hasura-app.io//counter", true);
	request.send(null);
};