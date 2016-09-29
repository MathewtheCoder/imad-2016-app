
var but = document.getElementById('counter');

but.onclick = function() {
	
	//Make request object
	var request = new XMLHttpRequest();
	//Capture the response and store it in a variable
	request.onreadystatechange = function() {
		//console.warn(request.readystate);
		if(request.readyState === XMLHttpRequest.DONE){
			//Do something
			if(request.status === 200){
				//console.info("Ready");
				var counter = request.responseText;
				var count = document.getElementById('count');
				//Render it in span
				count.innerHTML = counter.toString();
			}		
		}	
	};
	request.open('GET',"http://mathewthecoder.imad.hasura-app.io/counter", true);
	request.send(null);
};
var inputField = document.getElementById('txt_name');
var submit = document.getElementById('btn_submit');
submit.onclick = function() {
	//Extract text
	var input = inputField.value;
	//Make request object
	var request = new XMLHttpRequest();
	//Capture the response and store it in a variable
	request.onreadystatechange = function() {
		//console.warn(request.readystate);
		if(request.readyState === XMLHttpRequest.DONE){
			//Do something
			if(request.status === 200){
				//console.info("Ready");
				var names = request.responseText;
				names = JSON.parse(names);
				var list = '';
				for (var i=0; i<names.length; i++){
					list+="<li>"+names[i]+"</li>";
				}
				var ul = document.getElementById('nameList');
				ul.innerHTML = list;
			}		
		}
//Make a request to server and send the name

};
//Send request
request.open('GET',"http://mathewthecoder.imad.hasura-app.io/search-name?name="+input, true);
request.send(null);

};