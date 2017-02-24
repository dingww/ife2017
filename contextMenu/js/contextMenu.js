window.onload = function() {
	var oLi = document.getElementsByTagName('li');
	var oContent = document.getElementById('content');
	var oMymenu = document.getElementById('myMenu');

	contextMenu(oContent, oMymenu);

	// 点击自定义菜单条目弹出条目名称
	for (var i = 0; i < oLi.length; i++) {
		oLi[i].onclick = function() {
			var itemText = this.innerHTML;
			alert(itemText);
		}
	}

	function contextMenu(content, obj) {
		//首先禁用默认的右键
		document.oncontextmenu = function() {
			return false;
		}

		// 点击右键在鼠标的位置显示菜单
		content.onmousedown = function(e) {
			var e = e || window.event;
			if (e.button == 2) {
				var mouseX = e.clientX;
				var mouseY = e.clientY;
				var wh = getObjWH(obj);
				var menuW = wh.w;
				var menuH = wh.h;
				var contentW = content.scrollWidth;
				var contentH = content.scrollHeight;
				var contentL = content.offsetLeft;
				var contentT = content.offsetTop;

				obj.style.left = mouseX + menuW > contentL + contentW ? mouseX - contentL - menuW + "px" : mouseX - contentL + "px";
				obj.style.top = mouseY + menuH > contentT + contentH ? mouseY - contentT - menuH + "px" : mouseY - contentT + "px";
				obj.style.display = "block";
			}
		}

		// 点击自定义菜单以外的区域隐藏菜单
		document.onclick = function(e) {
			var oTarget = e.target || e.srcElement;
			if (e.button == 0) {
				if (oTarget.id != "myMenu") {
					obj.style.display = "none";
				}

			}

		}

		// 获取隐藏的菜单的宽度和高度
		function getObjWH(obj) {
			var wh = {};
			obj.style.display = "block";
			wh.w = obj.scrollWidth;
			wh.h = obj.scrollHeight;
			obj.style.display = "none";
			return wh;
		}
	}

}