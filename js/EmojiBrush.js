function EmojiBrush() {
  this.MAX_RES_SIZE = 160;
  this.palette = document.getElementById('palette-container');
  this.clickEvent = 'ontouchstart' in document ? 'touchend' : 'click';
  this.cmdKeyPressed = false;
  this.currentColor = 'red';
  this.hasChosenColor = false;
  this.undoIdx = 0;

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
    this.popHistory();
    this.redraw();
  },

  pushHistory: function() {
    appendImageWithCurrentCanvasScreenshot();
    brush.undoIdx++;

  },

  popHistory: function() {

    if (this.undoIdx === 0) {
      return;
    }

    var $images = $('#history-images').find('img');
    var img = $images[this.undoIdx - 1];
    var src = $(img).attr('src');

    this.renderCanvasWithURL(src);

    $(img).remove();

    this.undoIdx--;
  },

  flatten: function() {
    this.undoIdx--;
    $('#history-images').find('img').first().remove();
  },

  renderCanvasWithURL: function(url) {
    var raster = new paper.Raster();
    raster.size = new paper.Size(paper.project.view.size.width, paper.project.view.size.height);
    raster.position = new paper.Point(paper.project.view.size.width / 2, paper.project.view.size.height / 2);
    raster.source = url
    var layer = new paper.Layer();
    layer.addChild(raster);
    paper.project.layers.splice(3, 10, layer);
  },

  clear: function() {
    paper.project.layers.splice(3);
    new paper.Layer();
    var rect = new paper.Shape.Rectangle(0, 0, paper.project.view.size.width, paper.project.view.size.height);
    rect.fillColor = 'white';
    $('#history-images').empty();
    this.undoIdx = 0;
    this.redraw();
  },

  redraw: function() {
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
      self.hasChosenColor = true;
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

