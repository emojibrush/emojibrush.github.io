function EmojiBrush() {
  this.MAX_RES_SIZE = 160;
  this.cmdKeyPressed = false;
  this.currentColor = 'red';
  this.url;

  this.bindEvents();
}

EmojiBrush.prototype = {
  keyDown: function(e) {
    if (e.keyCode === 91) {
      this.cmdKeyPressed = true;
    }
    if (e.keyCode === 90 && this.cmdKeyPressed) {
      this.undo();
    }
  },

  keyUp: function(e) {
    if (e.keyCode === 91) {
      this.cmdKeyPressed = false;
    }
  },

  undo: function() {
    paper.project.layers.pop();
    if (paper.project) {
      paper.project._needsUpdate = true; // forces update
      paper.project.view.update();
    }
  },

  randomImageURL: function() {
    var images = colors[this.currentColor];
    var random = Math.floor(Math.random() * images.length);
    var image = images[random];
    url = 'images/' + this.currentColor + '/' + image;
    return url;
  },

  takeScreenShot: function() {
    var canvas = document.getElementsByTagName('canvas')[0];
    // var base64Data = canvas.toDataURL();
    // var binaryData = this.base64ToBinary(base64Data);
  },

  bindEvents: function() {
    var self = this;

    document.addEventListener('keydown', function(event) {self.keyDown(event);}, false);
    document.addEventListener('keyup', function(event) {self.keyUp(event);}, false);

    var links = document.getElementsByClassName('color');
    Array.prototype.slice.call(links).forEach(function(link) {
      link.addEventListener('click', function(e) {
        var elem = e.currentTarget;
        self.currentColor = elem.getAttribute('data-color');
      }, false);
    });
  }
}

