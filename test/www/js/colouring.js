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
    //letter_a.firstTouch(cb_lastPoints[0]);
    letter_a.action(cb_lastPoints[0], presses, A_DOWN);
    cb_canvas.onmousemove = drawMouse;
  }

  return false;
}

// Called whenever cursor position changes after drawing has started
function stopDraw(e) {
  e.preventDefault();
  cb_canvas.onmousemove = null;
  var coords = cb_lastPoints[cb_lastPoints.length - 1];
  //letter_a.firstRelease(coords);
  letter_a.action(coords, presses, A_UP);
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
  if (dist > 30) {
    failure = true;
    console.log("too far");
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
    //console.log('release in');

    if ((idx == this.mark.length - 1) && !failure) {
      console.log('Successfully finished letter.');
      alert('Successfully finished letter.');
    }
    return true;
  }

  //console.log('release out');
  failure = true;
  return false;
};

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

function distance(p, q) {
  return Math.abs(q.x - p.x) + Math.abs(q.y - p.y);
}

/*
function Closest_BruteForce(points) {
  var count = points.length;
  var p;
  var q;
  var result = {};

  if (count < 2) {
    return Infinity;
  }

  // Seed the result - doesn't matter what points are used
  // This just avoids having to do null checks in the main loop below
  //var result = new Segment(points[0], points[1]);
  // just two points
  //var bestLength = result.Length();
  var bestLength = distance(points[0], points[1]);
  // distance

  for (var i = 0; i < count; i++) {
    for (var j = i + 1; j < count; j++) {
      if (distance(points[i], points[j]) < bestLength) {
        //result = new Segment(points[i], points[j]);
        //bestLength = result.Length();
        bestLength = distance(points[i], points[j]);
        result.p = points[i];
        result.q = points[j];
      }
    }
  }

  return result;
  //return bestLength;
}

function ysort(a, b) {
  return ((a&0xffff) - (b&0xffff));
}

function MyClosestRec(pointsByX) {
  var count = pointsByX.length;
  if (count <= 4) {
    return Closest_BruteForce(pointsByX);
  }

  var mid = pointsByX.length >> 1;
  var rightByX = pointsByX.splice(mid);

  // left and right lists sorted by X, as order retained from full list
  var leftByX = pointsByX;
  var leftResult = MyClosestRec(leftByX);

  //var rightByX = pointsByX.Skip(count/2).ToList();
  var rightResult = MyClosestRec(rightByX);

  //var result = rightResult.Length() < leftResult.Length() ? rightResult : leftResult;
  var result = distance(rightResult.p, rightResult.q) < distance(leftResult.p, leftResult.q) ? rightResult : leftResult;

  // There may be a shorter distance that crosses the divider
  // Thus, extract all the points within result.Length either side
  //var midX = leftByX.Last().X;
  var midX = leftByX[leftByX.length - 1] >> 16;
  // x coordinate

  var bandWidth = distance(result.p, result.q);
  //var inBandByX = pointsByX.Where(p => Math.abs(midX - p.X) <= bandWidth);
  var inBandByX = new Array();
  for (var i=0; i<pointsByX.length; i++) {
    var p = pointsByX[i];
    if (Math.abs(midX - p.x) <= bandWidth) {
      inBandByX.push(p);
    }
  }

  // Sort by Y, so we can efficiently check for closer pairs
  //var inBandByY = inBandByX.OrderBy(p => p.Y).ToArray();
  var inBandByY = inBandByX.slice();
  inBandByY.sort(ysort);

  var iLast = inBandByY.length - 1;
  for (var i = 0; i < iLast; i++ )
  {
    var pLower = inBandByY[i];

    for (var j = i + 1; j <= iLast; j++)
    {
      var pUpper = inBandByY[j];

      // Comparing each point to successivly increasing Y values
      // Thus, can terminate as soon as deltaY is greater than best result
      if ((pUpper.y - pLower.y) >= distance(result.p, result.q))
        break;

      if (distance(pLower, pUpper) < distance(result.p, result.q)) {
        //result = new Segment(pLower, pUpper);
        result.p = pLower;
        result.q = pUpper;
      }
    }
  }

  return result;
}
*/

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

  if (penalty > 6) {
    failure = true;
    console.log('Reverse pattern detected.');
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

function a_line_1() {
  shape = new Array();

  shape[0] = 1900795;
  shape[1] = 1900794;
  shape[2] = 1900793;
  shape[3] = 1966328;
  shape[4] = 1966327;
  shape[5] = 2031861;
  shape[6] = 2031860;
  shape[7] = 2097394;
  shape[8] = 2097392;
  shape[9] = 2162925;
  shape[10] = 2162923;
  shape[11] = 2228457;
  shape[12] = 2293991;
  shape[13] = 2293989;
  shape[14] = 2359522;
  shape[15] = 2425055;
  shape[16] = 2490588;
  shape[17] = 2556122;
  shape[18] = 2621654;
  shape[19] = 2752722;
  shape[20] = 2818254;
  shape[21] = 2949324;
  shape[22] = 3014857;
  shape[23] = 3014853;
  shape[24] = 3145922;
  shape[25] = 3211455;
  shape[26] = 3276986;
  shape[27] = 3408056;
  shape[28] = 3539123;
  shape[29] = 3604656;
  shape[30] = 3670188;
  shape[31] = 3801256;
  shape[32] = 3866789;
  shape[33] = 3932321;
  shape[34] = 3997854;
  shape[35] = 4063387;
  shape[36] = 4194456;
  shape[37] = 4325524;
  shape[38] = 4391058;
  shape[39] = 4391054;
  shape[40] = 4456587;
  shape[41] = 4587657;
  shape[42] = 4718725;
  shape[43] = 4784259;
  shape[44] = 4849792;
  shape[45] = 4915324;
  shape[46] = 4980858;
  shape[47] = 5111926;
  shape[48] = 5177458;
  shape[49] = 5242991;
  shape[50] = 5308523;
  shape[51] = 5374055;
  shape[52] = 5505123;
  shape[53] = 5570655;
  shape[54] = 5767258;
  shape[55] = 5832790;
  shape[56] = 5898322;
  shape[57] = 5963855;
  shape[58] = 6029388;
  shape[59] = 6160456;
  shape[60] = 6160453;
  shape[61] = 6225987;
  shape[62] = 6291521;
  shape[63] = 6291520;
  shape[64] = 6357055;
  shape[65] = 6422589;
  shape[66] = 6422588;
  shape[67] = 6488121;
  shape[68] = 6488119;
  shape[69] = 6553653;
  shape[70] = 6619187;
  shape[71] = 6684720;
  shape[72] = 6750254;
  shape[73] = 6815786;
  shape[74] = 6881320;
  shape[75] = 6946854;
  shape[76] = 7012387;
  shape[77] = 7077921;
  shape[78] = 7077920;
  shape[79] = 7143454;
  shape[80] = 7143453;
  shape[81] = 7208987;
  shape[82] = 7208985;
  shape[83] = 7274520;
  shape[84] = 7274519;
  shape[85] = 7274518;
  shape[86] = 7340054;
  shape[87] = 7340053;
  shape[88] = 7340052;
  shape[89] = 7405587;
  shape[90] = 7405585;
  shape[91] = 7471119;
  shape[92] = 7536654;
  shape[93] = 7602190;
  shape[94] = 7602191;
  shape[95] = 7602192;
  shape[96] = 7667728;
  shape[97] = 7667729;
  shape[98] = 7667730;
  shape[99] = 7733267;
  shape[100] = 7733268;
  shape[101] = 7798805;
  shape[102] = 7798806;
  shape[103] = 7864343;
  shape[104] = 7864344;
  shape[105] = 7864345;
  shape[106] = 7929881;
  shape[107] = 7929882;
  shape[108] = 7929883;
  shape[109] = 7929885;
  shape[110] = 7929886;
  shape[111] = 7995423;
  shape[112] = 7995424;
  shape[113] = 7995427;
  shape[114] = 7995428;
  shape[115] = 7995429;
  shape[116] = 8060967;
  shape[117] = 8060968;
  shape[118] = 8060970;
  shape[119] = 8060972;
  shape[120] = 8126510;
  shape[121] = 8126512;
  shape[122] = 8192049;
  shape[123] = 8257588;
  shape[124] = 8257590;
  shape[125] = 8323128;
  shape[126] = 8388665;
  shape[127] = 8454204;
  shape[128] = 8519742;
  shape[129] = 8519744;
  shape[130] = 8585281;
  shape[131] = 8650819;
  shape[132] = 8716358;
  shape[133] = 8781896;
  shape[134] = 8781899;
  shape[135] = 8847437;
  shape[136] = 8912975;
  shape[137] = 8912977;
  shape[138] = 8912978;
  shape[139] = 8978516;
  shape[140] = 8978518;
  shape[141] = 8978519;
  shape[142] = 9044056;
  shape[143] = 9044057;
  shape[144] = 9109596;
  shape[145] = 9109597;
  shape[146] = 9109598;
  shape[147] = 9175136;
  shape[148] = 9175138;
  shape[149] = 9175140;
  shape[150] = 9175141;
  shape[151] = 9175143;
  shape[152] = 9240680;
  shape[153] = 9306217;
  shape[154] = 9306220;
  shape[155] = 9306221;
  shape[156] = 9371758;
  shape[157] = 9437295;
  shape[158] = 9437297;
  shape[159] = 9502834;
  shape[160] = 9502836;
  shape[161] = 9502837;
  shape[162] = 9568375;
  shape[163] = 9568376;
  shape[164] = 9633914;
  shape[165] = 9699451;
  shape[166] = 9699453;
  shape[167] = 9764990;
  shape[168] = 9764991;
  shape[169] = 9830528;
  shape[170] = 9896065;
  shape[171] = 9896067;
  shape[172] = 9961605;
  shape[173] = 9961606;
  shape[174] = 10027144;
  shape[175] = 10092683;
  shape[176] = 10158220;
  shape[177] = 10158223;
  shape[178] = 10223761;
  shape[179] = 10289299;
  shape[180] = 10289302;
  shape[181] = 10354841;
  shape[182] = 10354843;
  shape[183] = 10420382;
  shape[184] = 10485920;
  shape[185] = 10485922;
  shape[186] = 10551460;
  shape[187] = 10682534;
  shape[188] = 10682536;
  shape[189] = 10748074;
  shape[190] = 10748075;
  shape[191] = 10813614;
  shape[192] = 10813616;
  shape[193] = 10813617;
  shape[194] = 10879155;
  shape[195] = 10879156;
  shape[196] = 10944694;
  shape[197] = 10944696;
  shape[198] = 11010234;
  shape[199] = 11010236;
  shape[200] = 11075774;
  shape[201] = 11141312;
  shape[202] = 11141314;
  shape[203] = 11206852;
  shape[204] = 11272391;
  shape[205] = 11337929;
  shape[206] = 11337932;
  shape[207] = 11403470;
  shape[208] = 11469008;
  shape[209] = 11534546;
  shape[210] = 11600084;
  shape[211] = 11600086;
  shape[212] = 11665623;
  shape[213] = 11665625;
  shape[214] = 11731163;
  shape[215] = 11731165;
  shape[216] = 11796703;
  shape[217] = 11796705;
  shape[218] = 11796707;
  shape[219] = 11862244;
  shape[220] = 11862246;
  shape[221] = 11927784;
  shape[222] = 11927786;
  shape[223] = 11993324;
  shape[224] = 11993325;
  shape[225] = 12058863;
  shape[226] = 12058865;
  shape[227] = 12058866;
  shape[228] = 12058867;
  shape[229] = 12124404;
  shape[230] = 12124405;
  shape[231] = 12255479;
  shape[232] = 12255480;
  shape[233] = 12255481;
  shape[234] = 12321017;
  shape[235] = 12321018;
  shape[236] = 12386555;
  shape[237] = 12386556;
  shape[238] = 12386557;

  r_shape = new Array();
  // reverse shape

  for (var i=0; i<shape.length; i++) {
    r_shape[shape[i]] = i;
  }

  a_r_shape.push(r_shape);

  shape = radix_sort(shape);

  a_shape.push(shape);
}


function a_line_2() {
  shape = new Array();

  shape[0] = 2490546;
  shape[1] = 2556082;
  shape[2] = 2621618;
  shape[3] = 2752690;
  shape[4] = 2818226;
  shape[5] = 3014834;
  shape[6] = 3276978;
  shape[7] = 3473586;
  shape[8] = 3604658;
  shape[9] = 3866802;
  shape[10] = 4063410;
  shape[11] = 4260018;
  shape[12] = 4456626;
  shape[13] = 4653234;
  shape[14] = 4915378;
  shape[15] = 5111986;
  shape[16] = 5308594;
  shape[17] = 5505202;
  shape[18] = 5701810;
  shape[19] = 5898418;
  shape[20] = 6160562;
  shape[21] = 6422706;
  shape[22] = 6553778;
  shape[23] = 6684850;
  shape[24] = 6946994;
  shape[25] = 7209138;
  shape[26] = 7405746;
  shape[27] = 7536818;
  shape[28] = 7667890;
  shape[29] = 7864498;
  shape[30] = 8061106;
  shape[31] = 8323250;
  shape[32] = 8585394;
  shape[33] = 8782002;
  shape[34] = 8913074;
  shape[35] = 9044146;
  shape[36] = 9175218;
  shape[37] = 9437362;
  shape[38] = 9633970;
  shape[39] = 9765042;
  shape[40] = 9830578;
  shape[41] = 9896114;
  shape[42] = 10027186;
  shape[43] = 10289330;
  shape[44] = 10420402;
  shape[45] = 10682546;
  shape[46] = 10748082;
  shape[47] = 10879154;
  shape[48] = 11010226;
  shape[49] = 11141298;
  shape[50] = 11206834;
  shape[51] = 11272370;
  shape[52] = 11337906;
  shape[53] = 11403442;
  shape[54] = 11468978;
  shape[55] = 11534514;
  shape[56] = 11600048;
  shape[57] = 11796656;
  shape[58] = 11862192;

  r_shape = new Array();
  // reverse shape

  for (var i=0; i<shape.length; i++) {
    r_shape[shape[i]] = i;
  }

  a_r_shape.push(r_shape);

  shape = radix_sort(shape);
  a_shape.push(shape);
}

var a_shape = new Array();
var a_r_shape = new Array();
a_line_1();
a_line_2();
// init first line of letter A
//shape = new Array();

