function EmojiBrush() {
  this.MAX_RES_SIZE = 160;
  this.palette = document.getElementById('palette-container');
  this.clickEvent = 'ontouchstart' in document ? 'touchend' : 'click';
  this.cmdKeyPressed = false;
  this.currentColor = 'red';
  this.hasChosenColor = false;
  this.undoIdx = 0;
  this.history = [];

  // this.awsUploadParamsURL = "http://emojibrush.herokuapp.com";
  this.awsUploadParamsURL = "http://localhost:3000";

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
    var raster = this.rasterForCurrentCanvas();
    raster.opacity = 0;
    this.history.push(raster);

    brush.undoIdx++;
  },

  popHistory: function() {

    if (this.undoIdx == 1) {
      return;
    }

    this.history.pop();
    this.undoIdx--;

    var raster = this.history[this.undoIdx - 1];
    if (raster) {
      this.renderCanvasWithRaster(raster);
    }
  },

  flatten: function() {
    this.undoIdx--;
    this.history.shift();
  },

  renderCanvasWithRaster: function(raster) {
    raster.opacity = 1;
    var layer = new paper.Layer();
    layer.addChild(raster);
    paper.project.layers.splice(2, paper.project.layers.length, layer);
    this.redraw();
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

  rasterForCurrentCanvas: function() {
    var raster = new paper.Raster();
    raster.size = new paper.Size(paper.project.view.size.width, paper.project.view.size.height);
    raster.position = new paper.Point(paper.project.view.size.width / 2, paper.project.view.size.height / 2);
    raster.source = canvas.toDataURL();
    raster.scale(1 / window.devicePixelRatio);
    return raster;
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

  shareImage: function() {
    var self = this;
    this.getAWSParams(function(formData) {
      self.uploadImage(formData);
    });
  },

  getAWSParams: function(callback) {
    var base64Image = this.history[this.history.length - 1].source.split(',')[1];
    var image = window.atob(base64Image);
    $.getJSON(this.awsUploadParamsURL, function(response) {
      var formData = new FormData();
      var inputs = Object.keys(response);
      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        formData.append(input, response[input]);
      }
      formData.append('file', image, 'emoji.png');
      callback(formData);
    });
  },

  uploadImage: function(formData) {
    this.xhr = $.ajax({
      url: 'https://s3.amazonaws.com/assets.emojibrush.com',
      type: 'post',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      xhr: function() {
        var xhr = $.ajaxSettings.xhr();
        if (xhr.upload) {
          // xhr.upload.addEventListener('progress', self._progress, false);
        }
        return xhr;
      },
      success: function(response) {
        console.log(response);
        // if (! self._success) return;

        /*
        var $postResponse = $(response);
        var upload = {
          fileType: this.fileType,
          fileName: this.fileName,
          fileSize: this.fileSize,
          url: $postResponse.find("PostResponse Location").text(),
          bucket: $postResponse.find("PostResponse Bucket").text(),
          key:  $postResponse.find("PostResponse Key").text(),
          etag:  $postResponse.find("PostResponse ETag").text(),
          response: response
        };
        self._success.apply(self, [upload]);
        */
      },
      //beforeSend: self._start,
      //load: self._load,
      //abort: self._abort,
      error: function(error) {
        console.log(error);
        //self._error
      }
    });
  },

  b64toBlob: function(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
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

