window.onload = function() {
	var oBtn = document.getElementById('btn');
	var oDown = document.getElementById('down');
	var oUl = document.getElementsByTagName('ul')[0];
	var oLi = document.getElementsByTagName('li');
	var oReg = document.getElementById('inputReg');
	var oText = document.getElementById('inputTxt');
	var oResult = document.getElementById('result');

	//可匹配带“+86”和不带“+86”的手机号，手机号码段查询结果为： 
	// 150、151、152、153、155、156、157、158、159 九个 
	// 130、131、132、133、134、135、136、137、138、139 十个 
	// 180、182、185、186、187、188、189 七个
	// 13、15、18共30个号段，154、181、183、184暂时没有，加上147共27个。
	var numReg = /(^1|\s1|^\+861|\s\+861)(3\d|47|5[0-35-9]|8[025-9])\d{8}|^\+861(3\d|47|5[0-35-9]|8[025-9])\d{8}/g;

	// 测试是否有效相邻单词的正则表达式
	var wordReg = /\b([A-Za-z]+(-[A-Za-z]+)*)\s\1(\s|$)/g;

	var reg = [numReg, wordReg, ''];

	// 显示正则表达式选项菜单
	oDown.onclick = function(event) {
		oUl.style.display = 'block';
		for (var i = 0; i < oLi.length; i++) {
			oLi[i].index = i;
			oReg.value = '';
			oLi[i].onclick = function() {
				oReg.value = reg[this.index];
				if (reg[this.index] === '') {
					oReg.focus();
				}
			}
		}
	}
	document.onclick = function(e) {
		var oTarget = e.target || e.srcElement;
		if (oTarget.id !== 'down') {
			oUl.style.display = 'none';
		}
	}

	// 验证匹配项
	oBtn.onclick = function() {
		var testTxt = oText.value;
		var regExp = oReg.value;
		if (regExp == reg[0]) {
			testPhonenumber(testTxt, regExp, oResult);
			// alert(regExp);
		} else if (regExp == reg[1]) {
			testReword(testTxt, regExp, oResult);
			// alert(regExp);
		} else {
			testSelfDef(testTxt, regExp, oResult);
		}
	}

	// 匹配手机号码函数
	function testPhonenumber(number, reg, node) {
		var Reg = eval(reg);
		var matchN = number.match(Reg);
		var item = '';
		if (matchN) {
			item += '<p>是否有匹配：true</p><p>匹配的手机号码是：' + matchN + '</p>';
		} else {
			item += '<p>是否有匹配：false</p><p>提示：请输入手机号码。</p>';
		}
		node.innerHTML = item;
	}
	// 匹配相邻单词函数
	function testReword(word, reg, node) {
		var Reg = eval(reg);
		var matchW = word.match(Reg);
		var item = '';
		if (matchW) {
			item += '<p>是否有匹配：true</p><p>匹配的相邻单词是：' + matchW + '</p>';
		} else {
			item += '<p>是否有匹配：false</p><p>提示：没有找到相邻的单词。</p>'
		}
		node.innerHTML = item;
	}
	// 匹配自定义项函数
	function testSelfDef(text, reg, node) {
		var Reg = eval(reg);
		var matchT = text.match(Reg);
		var item = '';
		if (text === '' && reg === '') {
			item += '<p>请输入待匹配的文本和正则表达式！</p>'
		} else if (text === '') {
			item += '<p>请输入待匹配的文本！</p>'
		} else if (reg === '') {
			item += '<p>请输入正则表达式！</p>'
		} else {
			if (matchT) {
				item += '<p>是否有匹配：true</p><p>您的匹配项是：' + matchT + '</p>';
			} else {
				item += '<p>是否有匹配：false</p><p>提示：没有找到匹配项。</p>'
			}
			node.innerHTML = item;
		}
		node.innerHTML = item;
	}
}