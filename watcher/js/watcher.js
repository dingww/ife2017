window.onload = function() {
  var oBtn = document.getElementById('btn');
  var oClock = document.getElementById('clock');
  var oHour = document.getElementById('hour');
  var oMin = document.getElementById('minute');
  var oSec = document.getElementById('second');
  var oDay = document.getElementById('day');
  var today = new Date();
  var timer;

  // 获取时间信息  
  oHour.innerHTML = today.getHours();
  oMin.innerHTML = today.getMinutes();
  oSec.innerHTML = today.getSeconds();

  function PubSub() {
    this.handlers = {};
  }
  PubSub.prototype = {
    // 订阅事件
    on: function(eventType, handler) {
      var self = this;
      if (!(eventType in self.handlers)) {
        self.handlers[eventType] = [];
      }
      self.handlers[eventType].push(handler);
      return this;
    },
    // 发布事件
    emit: function(eventType) {
      var self = this;
      var handlerArgs = Array.prototype.slice.call(arguments, 1);
      for (var i = 0; i < self.handlers[eventType].length; i++) {
        self.handlers[eventType][i].apply(self, handlerArgs);
      }
      return self;
    }
  };

  // 订阅消息
  var pubsub = new PubSub();

  pubsub.on('clock', function(data) {
    oSec.innerHTML = data;
    if (data > 59) {
      oSec.innerHTML = 0;
      oMin.innerHTML = parseInt(oMin.innerHTML, 10) + 1;
    }
    if (parseInt(oMin.innerHTML, 10) > 59 && data == 60) {
      oMin.innerHTML = 0;
      oHour.innerHTML = parseInt(oHour.innerHTML, 10) + 1;
    }
    if (parseInt(oHour.innerHTML, 10) > 59) {
      oHour.innerHTML = 0;
      oDay.innerHTML = parseInt(oDay.innerHTML, 10) + 1;
    }
  });


  // 发布消息
  startCount();

  // 增加控制按钮
  var flag = 0;
  oBtn.onclick = function() {
    if (flag == 0) {
      oBtn.innerHTML = '开始';
      stopCount();
      flag = 1;
    } else {
      oBtn.innerHTML = '暂停';
      startCount();
      flag = 0;
    }
  }

  function startCount() {
    clearInterval(timer);
    timer = setInterval(function() {
      var numS = parseInt(oSec.innerHTML, 10);
      pubsub.emit('clock', count(numS));
    }, 1000);
  }

  function stopCount() {
    clearInterval(timer);
  }

  // 计数函数
  function count(num) {
    num++;
    return num;
  }

}