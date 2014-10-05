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

$('#trashcan').bind('click', function() {
  brush.clear();
});

/*
$(document).ready(function() {
  $('.color').easyAudio({
    src: 'audio/pop'
  });
});
*/
