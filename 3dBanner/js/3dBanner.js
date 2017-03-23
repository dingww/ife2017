var oImg = document.getElementsByTagName('img');
var oWrap = document.getElementById('wrap');
var oStage = document.getElementById('stage');
var oLeft = document.getElementById('left');
var oRight = document.getElementById('right');
var timer;
var len = oImg.length;
var flag = 0;

// 初始状态
slide(0);
Timer(flag);
// 左右按钮的显示与隐藏
oStage.onmouseover = function() {
	clearInterval(timer);
	oLeft.style.visibility = 'visible';
	oRight.style.visibility = 'visible';
}
oStage.onmouseout = function() {
		oLeft.style.visibility = 'hidden';
		oRight.style.visibility = 'hidden';
		Timer(flag);
	}
	// 点击左按钮向左滑动
oLeft.onclick = function() {
		flag--;
		slide(flag);
	}
	// 点击右按钮向右滑动
oRight.onclick = function() {
		flag++;
		slide(flag);
	}
	// 定义滑动函数
function slide(n) {
	oWrap.style.cssText = 'transform:translate3d( 0, 0, -1000px ) rotateY(' + n * 36 + 'deg)';
}
// 定义定时器，自动向右滑动展示
function Timer(n) {
	timer = setInterval(function() {
		n++;
		slide(n);
	}, 2000)
}