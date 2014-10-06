var clickEv = 'ontouchstart' in document ? 'touchend' : 'click';
var notIntro = false;
var brush = new EmojiBrush();

var palette = document.getElementById('palette');
var background = document.getElementById('blur-canvas');
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

function takeScreenShot() {
  var canvas = document.getElementById('canvas');
  var data = canvas.toDataURL("image/png");
  var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
  var decodedPng = Base64Binary.decode(encodedPng);
  return decodedPng;
}

function setLinkURL() {
  var canvas = $('#canvas')[0];
  $('#download').attr('href', canvas.toDataURL());
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$('#trashcan').bind('click', function() {
  var d = confirm("Are you sure you want to delete?");
  if (d == true) {
    x = brush.clear();
  } else {
    blink;
  }
});

function doThat($link, i) {
  setTimeout(function() {
    $link.css('opacity', '1');
  }, i * 20);
}

var $links = $('.color');


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

  $('#draw').bind(clickEv, function() {
    notIntro = true;
    $('#intro').fadeOut(function() {

      setTimeout(function() {
        $('#palette').css('opacity', '1');
        $links.each(function(idx) {
          doThat($(this), idx);
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

  $('#share').bind('click', function() {
  });
});

