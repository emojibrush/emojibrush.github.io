function EmojiBrush() {
  this.MAX_RES_SIZE = 160;
  this.palette = document.getElementById('palette-container');
  this.clickEvent = 'ontouchstart' in document ? 'touchend' : 'click';
  this.cmdKeyPressed = false;
  this.currentColor = 'red';

  this.bindEvents();
}

EmojiBrush.prototype = {
  keyDown: function(e) {

    // cmd or ctrl
    if (e.keyCode === 91 || e.ctrlKey) {
      this.cmdKeyPressed = true;
    }

    // cmd/ctrl - z
    if (e.keyCode === 90 && this.cmdKeyPressed) {
      this.undo();
    }
  },

  keyUp: function(e) {
    if (e.keyCode === 91 || e.keyCode === 17) {
      this.cmdKeyPressed = false;
    }
  },

  undo: function() {
    /*
    if (paper.project.layers.length > 3) {
      paper.project.layers.pop();
      paper.project._needsUpdate = true;
      paper.project.view.update();
    }
    */
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
    return 'images/' + this.currentColor + '/' + images[random];
  },

  setCurrentColor: function(color) {
    var $elem = this.elemForColor(color);
    $elem.addClass('current');
    this.currentColor = color;
    this.setCursorImageForColor(color);
  },

  hidePalette: function() {
    $('#palette-container').addClass('hidden');
  },

  showPalette: function() {
    $('#palette-container').removeClass('hidden');
  },

  setTempColor: function(color) {
    this.setCursorImageForColor(color);
  },

  elemForColor: function(color) {
    return $('.color[data-color='+color+']');
  },

  setCursorImageForColor: function(color) {
    $('body').css('cursor', 'url(images/cursors/' + color + '.png) 10 17, auto');
  },

  bindEvents: function() {
    var self = this;

    $(document).bind('keydown', function(e) { self.keyDown(e); });
    $(document).bind('keyup', function(e) { self.keyUp(e); });

    var $links = $('.color');
    $links.bind(self.clickEvent, function(e) {
      e.preventDefault();
      $links.removeClass('current');
      var color = $(this).attr('data-color');
      self.setCurrentColor(color);
      ga('send', 'event', 'color', 'selected', color);
    });

    $links.bind('mouseenter', function() {
      self.setTempColor($(this).attr('data-color'));
    });

    $('#palette-container').bind('mouseleave', function() {
      self.setCurrentColor(self.currentColor);
    });

    $('#palette-tip').bind(self.clickEvent, function(e) {
      e.preventDefault();
      self.showPalette();
    });
  }
}

