window.onload = function() {
	var oInput1 = document.getElementById('input1');
	var oInput2 = document.getElementById('input2');
	var oBtn1 = document.getElementById('btn1');
	var oBtn2 = document.getElementById('btn2');
	// 验证手机号码
	oBtn1.onclick = function() {
		var isMatch1 = document.getElementById('isMatch1');
		var text1 = oInput1.value;
		// var reg = /^1[358][0-9]{9}$/; //只能匹配不带'-'格式的手机号码
		var reg = /^1[358]\d[-]?\d{8}$/; //可匹配带'-'和不带'-'格式的11为手机号码
		var num = text1.match(reg);
		console.log(num);
		if (num === null) {
			isMatch1.innerHTML = 'false';
		} else {
			isMatch1.innerHTML = 'true';
		}
	}

	// 验证是否有相邻重复的单词
	oBtn2.onclick = function() {
		var isMatch2 = document.getElementById('isMatch2');
		var text2 = oInput2.value;
		var reg = /\b(\w+)\s\1\s\b|\b(\w+)\s\1\b/;
		var str = text2.match(reg);
		console.log(str);
		if (str === null) {
			isMatch2.innerHTML = 'false';
		} else {
			isMatch2.innerHTML = 'true';
		}
	}
}