function setup(){
	createCanvas (200,200);
	loadJSON('http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1', gotData);
 
}
function gotData(data){
	println(data);
}

function draw (){
	background (0);
}