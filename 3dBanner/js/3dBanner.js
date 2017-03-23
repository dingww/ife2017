var oImg = document.getElementsByTagName('img');
var oWrap = document.getElementById('wrap');
var oStage = document.getElementById('stage');
var oLeft = document.getElementById('left');
var oRight = document.getElementById('right');
var timer;
var len = oImg.length;
var flag = 0;
oWrap.style.cssText = 'transform:translate3d( 0, 0, -1000px ) rotateY(0deg)';

oStage.onmouseover = function() {
	clearInterval(timer);
	oLeft.style.visibility = 'visible';
	oRight.style.visibility = 'visible';
}
oStage.onmouseout = function() {
	oLeft.style.visibility = 'hidden';
	oRight.style.visibility = 'hidden';
	timer = setInterval(function() {
		flag++;
		oWrap.style.cssText = 'transform:translate3d( 0, 0, -1000px ) rotateY(' + (flag * 36) + 'deg)';
	}, 2000);
}
oLeft.onclick = function() {
	flag--;
	oWrap.style.cssText = 'transform:translate3d( 0, 0, -1000px ) rotateY(' + (flag * 36) + 'deg)';
}
oRight.onclick = function() {
	flag++;
	oWrap.style.cssText = 'transform:translate3d( 0, 0, -1000px ) rotateY(' + (flag * 36) + 'deg)';
}

timer = setInterval(function() {
	flag++;
	oWrap.style.cssText = 'transform:translate3d( 0, 0, -1000px ) rotateY(' + (flag * 36) + 'deg)';
}, 2000)