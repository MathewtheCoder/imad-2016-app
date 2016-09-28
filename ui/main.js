console.log('Loaded!');
var img = document.getElementById('madi');
var marginLeft = 0;
img.onclick = function() {
	var interval = setInterval(moveRight, 50);
};
function moveRight(){
	if(marginLeft>50){
		//console.info('Limit');
		clearInterval(interval);
	}
	marginLeft = marginLeft + 1;
	img.style.marginLeft = marginLeft + "px";
}