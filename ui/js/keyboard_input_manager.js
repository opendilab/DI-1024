function KeyboardInputManager() {
  this.events = {};

  if (window.navigator.msPointerEnabled) {
    //Internet Explorer 10 style
    this.eventTouchstart    = "MSPointerDown";
    this.eventTouchmove     = "MSPointerMove";
    this.eventTouchend      = "MSPointerUp";
  } else {
    this.eventTouchstart    = "touchstart";
    this.eventTouchmove     = "touchmove";
    this.eventTouchend      = "touchend";
  }

  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

KeyboardInputManager.prototype.listen = function () {
  var self = this;

  var map = {
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left
    75: 0, // Vim up
    76: 1, // Vim right
    74: 2, // Vim down
    72: 3, // Vim left
    87: 0, // W
    68: 1, // D
    83: 2, // S
    65: 3  // A
  };

  // Respond to direction keys
  document.addEventListener("keydown", function (event) {
    var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                    event.shiftKey;
    var mapped    = map[event.which];

    if (!modifiers) {
      if (mapped !== undefined) {
        event.preventDefault();
        self.emit("move", mapped, false);
      }
    }

    // R key restarts the game
    if (!modifiers && event.which === 82) {
      self.restart.call(self, event);
    }
  });

  document.addEventListener('click', function(event){
    const inteval = 121;
    var o = document.getElementsByClassName("game-container")[0];
    const Y = Math.floor((event.pageY - o.offsetTop) / inteval);
    const X = Math.floor((event.pageX - o.offsetLeft) / inteval);
    // console.log('mouseup', event.pageY, event.pageX, o.offsetTop, o.offsetLeft, Y, X);
    event.preventDefault();
    self.emit("generate", [Y, X]);
  });


  // Respond to button presses
  this.bindButtonPress(".retry-button", this.restart);
  this.bindButtonPress(".restart-button", this.restart);
  this.bindButtonPress(".hint-button", this.hint);
  this.bindButtonPress(".ai-button", this.mode);
  this.bindButtonPress(".add-button", this.add);

  // Respond to swipe events
  var touchStartClientX, touchStartClientY;
  var gameContainer = document.getElementsByClassName("game-container")[0];

  gameContainer.addEventListener(this.eventTouchstart, function (event) {
    if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||
        event.targetTouches.length > 1) {
      return; // Ignore if touching with more than 1 finger
    }

    if (window.navigator.msPointerEnabled) {
      touchStartClientX = event.pageX;
      touchStartClientY = event.pageY;
    } else {
      touchStartClientX = event.touches[0].pageX;
      touchStartClientY = event.touches[0].pageY;
    }

    event.preventDefault();
    var o = document.getElementsByClassName("game-container")[0];
    const inteval = 67;
    const Y = Math.floor((touchStartClientY - o.offsetTop) / inteval);
    const X = Math.floor((touchStartClientX - o.offsetLeft) / inteval);
    // console.log('mouseup', touchStartClientY, touchStartClientX, o.offsetTop, o.offsetLeft, Y, X);
    self.emit("generate", [Y, X]);
  });

  gameContainer.addEventListener(this.eventTouchmove, function (event) {
    event.preventDefault();
  });

  gameContainer.addEventListener(this.eventTouchend, function (event) {
    if ((!window.navigator.msPointerEnabled && event.touches.length > 0) ||
        event.targetTouches.length > 0) {
      return; // Ignore if still touching with one or more fingers
    }

    var touchEndClientX, touchEndClientY;

    if (window.navigator.msPointerEnabled) {
      touchEndClientX = event.pageX;
      touchEndClientY = event.pageY;
    } else {
      touchEndClientX = event.changedTouches[0].clientX;
      touchEndClientY = event.changedTouches[0].clientY;
    }

    var dx = touchEndClientX - touchStartClientX;
    var absDx = Math.abs(dx);

    var dy = touchEndClientY - touchStartClientY;
    var absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 10) {
      // (right : left) : (down : up)
      self.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
    }
  });
};

KeyboardInputManager.prototype.hint = function (event) {
  event.preventDefault();
  this.emit("hint");
};

KeyboardInputManager.prototype.mode = function (event) {
  event.preventDefault();
  this.emit("mode");
};

KeyboardInputManager.prototype.restart = function (event) {
  event.preventDefault();
  this.emit("restart");
};

KeyboardInputManager.prototype.add = function (event) {
    var o = document.getElementsByName("setting");
    var data = new Array();
    for (var i=0; i<o.length; i++) {
        data[i] = o[i].value;
    }

    var err_flag = false;
    var parsedData = data[0].split(',');
    for (var i = 0; i < parsedData.length; i++) {
      const value = parseInt(parsedData[i]);
      if ((value < 0) || (value == 1) || ((value & (value - 1)) != 0)) {
          console.log('illegal', i, value);
          err_flag = true;
          break;
      }
      parsedData[i] = value;
    }
    if (err_flag) {
        document.getElementById('add-result-text').innerHTML = "无效自定义格式";
    } else {
        this.emit("restartWithData", parsedData);
        document.getElementById('add-result-text').innerHTML = "自定义关卡成功";
    }
};

KeyboardInputManager.prototype.keepPlaying = function (event) {
  event.preventDefault();
  this.emit("keepPlaying");
};

KeyboardInputManager.prototype.bindButtonPress = function (selector, fn) {
  var button = document.querySelector(selector);
  button.addEventListener("click", fn.bind(this));
  button.addEventListener(this.eventTouchstart, fn.bind(this));
  //button.addEventListener(this.eventTouchend, fn.bind(this));
};
