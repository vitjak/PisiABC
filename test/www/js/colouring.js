// Author: Richard Garside - www.nogginbox.co.uk [2010]

var cb_canvas = null;
var cb_ctx = null;
var cb_lastPoints = null;
var cb_easing = 0.4;

// Setup event handlers
window.onload = init;
function init(e) {
  cb_canvas = document.getElementById("cbook");

  cb_lastPoints = Array();

  if (cb_canvas.getContext) {
    cb_ctx = cb_canvas.getContext('2d');
    cb_ctx.lineWidth = 4;
    cb_ctx.strokeStyle = "rgb(0, 0, 0)";
    cb_ctx.beginPath();

    cb_canvas.onmousedown = startDraw;
    cb_canvas.onmouseup = stopDraw;
    cb_canvas.ontouchstart = startDraw;
    cb_canvas.ontouchstop = stopDraw;
    cb_canvas.ontouchend = stopDraw;
    cb_canvas.ontouchmove = drawMouse;
  }
}

var limit_point = -1;
// point of no return

var prev_point = -1;
// prevous point

var presses = -1;
// number of clicks

var penalty = -1;
// penalty moves

var reward = -1;
// reward points

var failure = false;
// letter is successfully drawn

var A_DOWN = 0;
// action down (mouse press)
var A_UP = 1;
// action up (mouse release)

function startDraw(e) {
  presses++;
  limit_point = -1;
  prev_point = -1;
  penalty = -1;
  reward = -1;
  if (e.touches) {
    // Touch event
    for (var i = 1; i <= e.touches.length; i++) {
      cb_lastPoints[i] = getCoords(e.touches[i - 1]); // Get info for finger #1
    }
  }
  else {
    // Mouse event
    cb_lastPoints[0] = getCoords(e);
    //letter_a.action(cb_lastPoints[0], presses, A_DOWN);
    letter_curr.action(cb_lastPoints[0], presses, A_DOWN);
    cb_canvas.onmousemove = drawMouse;
  }

  return false;
}

// Called whenever cursor position changes after drawing has started
function stopDraw(e) {
  e.preventDefault();
  cb_canvas.onmousemove = null;
  var coords = cb_lastPoints[cb_lastPoints.length - 1];
  //letter_a.action(coords, presses, A_UP);
  letter_curr.action(coords, presses, A_UP);
}

function drawMouse(e) {
  if (e.touches) {
    // Touch Enabled
    for (var i = 1; i <= e.touches.length; i++) {
      var p = getCoords(e.touches[i - 1]); // Get info for finger i
      cb_lastPoints[i] = drawLine(cb_lastPoints[i].x, cb_lastPoints[i].y, p.x, p.y);
    }
  }
  else {
    // Not touch enabled
    var p = getCoords(e);
    cb_lastPoints[0] = drawLine(cb_lastPoints[0].x, cb_lastPoints[0].y, p.x, p.y);
  }
  cb_ctx.stroke();
  cb_ctx.closePath();
  cb_ctx.beginPath();
  return false;
}

// Draw a line on the canvas from (s)tart to (e)nd
function drawLine(sX, sY, eX, eY) {
  cb_ctx.moveTo(sX, sY);
  cb_ctx.lineTo(eX, eY);
  return { x: eX, y: eY };
}

var shape = new Array();
var shape_unique = new Array();

// Get the coordinates for a mouse or touch event
function getCoords(e) {
  var coords;

  if (e.offsetX) {
    coords = { x: e.offsetX, y: e.offsetY };
  }
  else if (e.layerX) {
    coords = { x: e.layerX, y: e.layerY };
  }
  else {
    coords = { x: e.pageX - cb_canvas.offsetLeft, y: e.pageY - cb_canvas.offsetTop };
  }

  //console.log(coords);

  var pp = (coords.x << 16) + coords.y;
  //if (shape_unique[pp] === undefined) {
  //  shape_unique[pp] = 1;
  //  shape.push(pp);
  //}


  if (presses >= a_shape.length) {
    failure = true;
    console.log('Too many clicks.');
    return coords;
  }
  var dist = find_closest(pp, a_shape[presses]);
  if (dist > 120) {
    failure = true;
    console.log("too far");
    //alert("too far");
  }

  prev_point = pp;


  return coords;
}

function dot_product (a, b) {
  return a.x * b.x + a.y * b.y;
}

function make_point (a, b) {
  var p = {};
  p.x = b.x - a.x;
  p.y = b.y - a.y;
  return p;
  //return {b.x - a.x, b.y - a.y};
}

function Letter (character) {
  this.character = character;
  this.mark = new Array();
}

Letter.prototype.print = function () {
  console.log('I am letter ' + this.character);
}

// Set breaking points for letter
Letter.prototype.setMark = function (tl, tr, bl) {
  this.mark.push({tl: tl, tr: tr, bl: bl});
}

// handle mouse up/mouse down and/or touch events
Letter.prototype.action = function (coords, stage, state) {
  var idx = (stage << 1) + state;
  if (idx >= this.mark.length) {
    return false;
  }
  var x = coords.x;
  var y = coords.y;

  var tl = this.mark[idx].tl;
  var tr = this.mark[idx].tr;
  var bl = this.mark[idx].bl;

  var am = make_point(tl, coords);
  var ab = make_point(tl, tr);
  var ad = make_point(tl, bl);

  var amab = dot_product(am, ab);
  var abab = dot_product(ab, ab);

  var amad = dot_product(am, ad);
  var adad = dot_product(ad, ad);

  //console.log('stage:' + stage + ' state: ' + state);

  if (amab > 0 && abab > amab && amad > 0 && adad > amad) {
    //alert('in');
    //console.log('release in');

    if ((idx == this.mark.length - 1) && !failure) {
      //console.log('Bravo!');
      alert('BRAVO!');
    }
    return true;
  }

  //console.log('release out');
  //alert('release out');
  failure = true;
  return false;
};

/*
var letter_a = new Letter('A');
// create letter A

letter_a.setMark({x: 2, y: 224}, {x: 78, y: 224}, {x: 28, y: 266});
// set start area

letter_a.setMark({x: 144, y: 224}, {x: 214, y: 224}, {x: 186, y: 266});
// set first line end area

letter_a.setMark({x: 27, y: 161}, {x: 93, y: 161}, {x: 50, y: 197});
// start of the second line

letter_a.setMark({x: 124, y: 161}, {x: 188, y: 161}, {x: 163, y: 197});
// end of the second line
*/

function distance(p, q) {
  return Math.abs(q.x - p.x) + Math.abs(q.y - p.y);
}

function find_closest(p, pset) {
  var closest = {};
  closest.x = pset[0] >> 16;
  closest.y = pset[0] & 0xffff;

  var point = {};
  point.x = p >> 16;
  point.y = p & 0xffff;

  var tmp_limit = -1;

  var cmin = distance(point, closest);

  for (var i=1; i<pset.length; i++) {
    var tmp_p = {};
    tmp_p.x = pset[i] >> 16;
    tmp_p.y = pset[i] & 0xffff;

    var dist = distance(point, tmp_p);
    if (dist < cmin) {
      cmin = dist;
      closest = tmp_p;
      tmp_limit = a_r_shape[presses][pset[i]];
    }
  }

  if (tmp_limit > limit_point) {
    reward++;
    limit_point = tmp_limit;
  }
  else if (Math.abs(limit_point - tmp_limit) < 4) {
    reward++;
  }
  else {
    reward = -1;
    penalty++;
  }

  if (reward > 5) {
    penalty = -1;
  }

  if (penalty > 60) {
    failure = true;
    console.log('Reverse pattern detected.');
    //alert('reverse');
  }
  //console.log('reward: ' + reward + ' penalty: ' + penalty)

  return cmin;
}

function radix_sort(old) {
  var shift;
  for (shift = 31; shift > -1; shift--) { //Loop for every bit in the integers

    tmp = new Array(old.length); //the array to put the partially sorted array into
    var j = 0;  //The number of 0s

    for(var i = 0; i < old.length; i++) {  //Move the 0s to the new array, and the 1s to the old one
      var move = old[i] << shift >= 0;  //If there is a 1 in the bit we are testing, the number will be negative  
      if(shift == 0 ? !move : move) {  //If this is the last bit, negative numbers are actually lower
        tmp[j] = old[i];
        j++;
      } else {  //It's a 1, so stick it in the old array for now
        old[i-j] = old[i];
      }
    }
    for(var i = j; i < tmp.length; i++) {  //Copy over the 1s from the old array
      tmp[i] = old[i-j];
    }
    old = tmp;  //And now the tmp array gets switched for another round of sorting
  }
  return old;
}


function pprint(s) {
  for (var i=0; i<s.length; i++) {
    console.log('shape[' + i + '] = ' + shape[i]);
  }
}

var r_shape;

function add_shape(shape) {
  //shape = new Array();
  r_shape = new Array();
  // reverse shape

  for (var i=0; i<shape.length; i++) {
    r_shape[shape[i]] = i;
  }

  a_r_shape.push(r_shape);

  shape = radix_sort(shape);

  a_shape.push(shape);

  //console.log(a_shape);
}

var a_shape = new Array();
var a_r_shape = new Array();
//a_line_1();
//a_line_2();
// init first line of letter A
//shape = new Array();

