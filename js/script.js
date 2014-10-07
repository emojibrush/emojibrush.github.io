var clickEv = 'ontouchstart' in document ? 'touchend' : 'click';
var intro = true;

var brush = new EmojiBrush();

var palette = document.getElementById('palette');
var offset = palette.getBoundingClientRect();

var canvas = document.getElementById('canvas');
var background = document.getElementById('blur-canvas');

var rect = { left: offset.left - 15, right: offset.left + offset.width + 15, top: offset.top, bottom: offset.bottom + 15 }

function setBackgroundBlurredImage(imageData) {
  var ctx = canvas.getContext('2d');
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var ctx2 = background.getContext('2d');
  ctx2.putImageData(imageData, -offset.left, 0);
  stackBlurCanvasRGBA("blur-canvas", 0, 0, background.width, background.height, 50);
}

function setLinkURL() {
  $('#download').attr('href', canvas.toDataURL());
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function fadeInColor($link, i) {
  setTimeout(function() {
    $link.css('opacity', '1');
  }, i * 20);
}

$(document).ready(function() {
  $('#download').bind('click', function() {
      ga('send', 'event', 'download', 'drawing', $(this).attr('src'));
  });

  $('.color').easyAudio({
    src: 'audio/pop',
    event: 'click'
  });

  $('.color').easyAudio({
    src: 'audio/tick',
    event: 'mouseenter'
  });

  $('#trashcan').bind('click', function() {
    if (confirm("Are you sure you want to delete?")) {
      brush.clear();
    }
  });

  var $links = $('.color');
  $('#draw').bind(clickEv, function() {
    intro = false;
    $('#intro').fadeOut(function() {

      setTimeout(function() {
        $('#palette').css('opacity', '1');
        $links.each(function(idx) {
          fadeInColor($(this), idx);
        });
        setTimeout(function() {
         $('#palette-tip-container').fadeIn('fast');
        }, 800);
      }, 200);

      initialTimer = setTimeout(function() {
        $('.color').first().addClass('current').trigger('click');
        brush.setCurrentColor('red');
      }, 1700);
    });

    ga('send', 'event', 'drawing', 'started');
  });

});

