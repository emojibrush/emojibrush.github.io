function EmojiBrush() {
  this.MAX_RES_SIZE = 160;
  this.cmdKeyPressed = false;
  this.currentColor = 'red';
  this.palette = document.getElementById('palette-container');
  this.paletteIsShowing = true;
  this.isDrawing = false;
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
    if (paper.project.layers.length > 1) {
      paper.project.layers.pop();
      if (paper.project) {
        paper.project._needsUpdate = true; // forces update
        paper.project.view.update();
      }
    }

    setBackgroundBlurredImage()
  },

  randomImageURL: function() {
    var images = colors[this.currentColor];
    var random = Math.floor(Math.random() * images.length);
    var image = images[random];
    url = 'images/' + this.currentColor + '/' + image;
    return url;
  },

  hidePalette: function() {
    this.paletteIsShowing = false;
    this.palette.setAttribute('class', 'hidden');
  },

  showPalette: function() {
    this.paletteIsShowing = true;
    this.palette.setAttribute('class', '');
  },

  bindEvents: function() {
    var self = this;

    document.addEventListener('keydown', function(event) {self.keyDown(event);}, false);
    document.addEventListener('keyup', function(event) {self.keyUp(event);}, false);

    var links = Array.prototype.slice.call(document.getElementsByClassName('color'));
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        links.forEach(function(link) { link.setAttribute('class', 'color') });
        var elem = e.currentTarget;
        elem.setAttribute('class', 'color current');
        self.currentColor = elem.getAttribute('data-color');
      }, false);
    });
  }
}

