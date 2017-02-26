var page = require('webpage').create(),
	system = require('system');
// console.log(system.args.length);

if (system.args.length >= 2) {
	try {
		var t = Date.now();
		var len = system.args.length;
		var keyword = '';
		for (var i = 1; i < len; i++) {
			keyword += system.args[i] + ' ';
		}

		var url = encodeURI('https://www.baidu.com/s?wd=' + keyword); //由于关键字如果是中文会出现找不到链接，所以需要先岁链接进行编码

		var dataList = [];
		page.open(url, function(status) {
			if (status !== 'success') {
				console.log('Fail to load the address');
				phantom.exit(1);
			} else {
				console.log('加载完成，正在努力抓取中...');
				setTimeout(function() {
					page.includeJs('jquery.js', function() {
						dataList = page.evaluate(function() {
							var data = [];
							$result = $('.c-container');
							$result.each(function(index) {
								data[index] = {
									title: $.trim($(this).find('.t').text()) || '',
									info: $.trim($(this).find('.c-abstract').text()) || '',
									link: $.trim($(this).find('.c-showurl').text()) || '',
									pic: $.trim($(this).find('.c-img').attr('src')) || '',
								}
							});
							return data;
						});
						var result = {
							code: 1,
							url: url,
							msg: '抓取成功！',
							word: keyword,
							time: Date.now() - t,
							dataList: dataList
						}

						console.log(JSON.stringify(result)); //打印抓取结果
						phantom.exit();
					})
				}, 2000);
			}
		});
	} catch (error) {
		console.error(JSON.stringify({
			code: 0,
			msg: '抓取失败。',
			error: error.message
		}));
		phantom.exit();
	}
}