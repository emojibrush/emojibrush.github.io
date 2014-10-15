var clickEv = 'ontouchstart' in document ? 'touchend' : 'click';
var intro = true;
var brush;
var $palette;
var offset;
var size;
var $canvas;
var canvas;
var $background;
var rect;

function setBackgroundBlurredImage() {
  var ctx = canvas.getContext('2d');
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var ctx2 = $background[0].getContext('2d');
  ctx2.putImageData(imageData, -rect.position.left, 0);
  stackBlurCanvasRGBA("blur-canvas", 0, 0, $background.width(), $background.height(), 50);
}

function setLinkURL() {
  $('#download').attr('href', canvas.toDataURL("image/jpeg", 0.9));
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function fadeInColor($link, i) {
  setTimeout(function() {
    $link.css('opacity', '1');
  }, i * 20);
}

function postArtwork(url) {
  $.ajax({
    url: "http://emojibrush.herokuapp.com/artwork",
    data: { "url": url },
    type: 'POST',
    success: function() {},
    error: function() {}
  });
}

function bindEvents() {
  $('#download').bind('click', function() {
    var url = $(this).attr('href');
    if ($.trim(url) !== "") {
      url = url.split(',')[1];
    }
    EmojiTracker.track('download', 'drawing');
    postArtwork(url);
  });

  $('#trashcan').bind('click', function() {
    if (window.confirm("Are you sure you want to delete?")) {
      brush.clear();
    }
  });

  var $links = $('.color');
  $('#draw').bind(clickEv, function() {
    intro = false;
    $('#intro').fadeOut(function() {

      setTimeout(function() {
        $palette.css('opacity', '1');
        $links.each(function(idx) {
          fadeInColor($(this), idx);
        });
        setTimeout(function() {
         $('#palette-tip').fadeIn('fast');
        }, 800);
      }, 200);

      initialTimer = setTimeout(function() {
        if ( ! brush.hasChosenColor) {
          $('.color').first().addClass('current').trigger('click');
          brush.setCurrentColor('red');
        }
      }, 1700);

    });

    EmojiTracker.track('drawing', 'started');
  });

  $('#email-yourself').bind('click', function() {
    EmojiTracker.track('email', 'self');
  });
}

function setupAudio() {
  var $poop = $('.color[data-color="brown"]');
  var poops = ['audio/poop', 'audio/poop2', 'audio/poop3', 'audio/poop4'];
  var $colors = $('.color').not($poop);

  $colors.easyAudio({ sound: 'audio/pop', event: 'click' });
  $colors.easyAudio({ sound: 'audio/tick', event: 'mouseenter' });
  $poop.easyAudio({ sound: poops, event: 'mouseenter' });
  $poop.easyAudio({ sound: poops, event: 'click' });
}

function setup() {
  $palette = $('#palette');
  offset = $palette.offset();
  size = {width: $palette.innerWidth(), height: $palette.innerHeight()};
  $canvas = $('#canvas');
  canvas = $canvas[0];
  $background = $('#blur-canvas');
  rect = { position: offset, size: size };
  brush = new EmojiBrush();
}

$(document).ready(function() {
  bindEvents();
  setupAudio();

  setup();
});

