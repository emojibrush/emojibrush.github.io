var brush;
var clickEv = 'ontouchstart' in document ? 'touchend' : 'click';
var intro = true;

var palette = document.getElementById('palette');
var offset = palette.getBoundingClientRect();

var canvas = document.getElementById('canvas');
var background = document.getElementById('blur-canvas');

var rect = { left: offset.left - 15, right: offset.left + offset.width + 15, top: offset.top, bottom: offset.bottom + 15 }

function setBackgroundBlurredImage() {
  var ctx = canvas.getContext('2d');
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var ctx2 = background.getContext('2d');
  ctx2.putImageData(imageData, -offset.left, 0);
  stackBlurCanvasRGBA("blur-canvas", 0, 0, background.width, background.height, 50);
}

function setLinkURL() {
  $('#download').attr('href', canvas.toDataURL("image/jpeg", 0.9));
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

function postArtwork(url) {
  console.log(url);
  $.ajax({
    url: "http://localhost:3000/artwork",
    data: {
      "url": url
    },
    type: 'POST',
    success: function(response) {
      console.log(success);
    },
    error: function(response) {
      console.log(success);
    }
  });
}

$(document).ready(function() {
  $('#download').bind('click', function() {
    var url = $(this).attr('href');
    if ($.trim(url) !== "") {
      url = url.split(',')[1];
    }
    ga('send', 'event', 'download', 'drawing', url);

    postArtwork(url);
  });

  var $poop = $('.color[data-color="brown"]');
  var poops = ['audio/poop', 'audio/poop2', 'audio/poop3', 'audio/poop4'];
  var $colors = $('.color').not($poop);

  $colors.easyAudio({
    src: 'audio/pop',
    event: 'click'
  });

  $colors.easyAudio({
    src: 'audio/tick',
    event: 'mouseenter'
  });

  console.log(poops[2]);
  $poop.easyAudio({
    src: poops[Math.floor(Math.random() * 5)],
    event: 'mouseenter'
  });

  $poop.easyAudio({
    src: poops[Math.floor(Math.random() * 4)],
    event: 'click'
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

    ga('send', 'event', 'drawing', 'started');
  });

  $('#email-yourself').bind('click', function() {
    ga('send', 'event', 'email', 'self');
  });

  brush = new EmojiBrush();

});

