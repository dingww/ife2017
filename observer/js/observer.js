function Observer(data) {
	this.data = data;
	this.walk(data)
}

var p = Observer.prototype;

p.walk = function(obj) {
	var val;
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			val = obj[key];
			if (typeof val === 'object') {
				new Observer(val);
			}
			this.convert(key, val);
		}
	}
};

p.convert = function(key, val) {
	Object.defineProperty(this.data, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			console.log('你访问了' + key);
			return val;
		},
		set: function(newVal) {
			if (typeof newVal === 'object') {
				new Observer(newVal);
			}
			console.log('你设置了' + key);
			console.log('新的' + key + '=' + newVal);

			if (newVal === val) {
				return;
			}
			val = newVal;
		}
	})
};

var app1 = new Observer({
	name: 'youngwind',
	age: 25,
	address: {
		city: 'beijing'
	}
});
var app2 = new Observer({
	university: 'bupt',
	major: 'computer'
});