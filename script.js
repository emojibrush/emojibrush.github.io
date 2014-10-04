var palette = document.getElementById('palette');
var background = document.getElementById('blur-canvas');
var offset = palette.getBoundingClientRect();
var canvas = document.getElementById('canvas');

var rect = {
  left: offset.left - 15,
  right: offset.left + offset.width + 15,
  top: offset.top,
  bottom: offset.bottom + 15
}
