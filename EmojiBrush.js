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
    if (paper.project.layers.length > 3) {
      paper.project.layers.pop();
      paper.project._needsUpdate = true;
      paper.project.view.update();
    }

    setBackgroundBlurredImage()
  },

  clear: function() {
    paper.project.layers.splice(3);
    paper.project._needsUpdate = true; // forces update
    paper.project.view.update();
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

    $(document).bind('keydown', function(e) {
      self.keyDown(e);
    });
    $(document).bind('keyup', function(e) {
      self.keyUp(e);
    });

    var $links = $('.color');
    $links.bind('click', function() {
      $links.removeClass('current');
      var $elem = $(this);
      $elem.addClass('current');
      self.currentColor = $elem.attr('data-color');
      $('#canvas').css('cursor', 'url(images/cursors/' + self.currentColor + '.png)');
    });
  }
}

