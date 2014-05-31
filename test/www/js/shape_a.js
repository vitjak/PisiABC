var letter_arr = new Array();

function letter1() {
letter_a = new Letter('A');
// create letter A

//letter_a.setMark({x: 2, y: 224}, {x: 78, y: 224}, {x: 28, y: 266});
letter_a.setMark({x: 112, y: 670}, {x: 270, y: 670}, {x: 161, y: 760});
// set start area

//letter_a.setMark({x: 144, y: 224}, {x: 214, y: 224}, {x: 186, y: 266});
letter_a.setMark({x: 471, y: 670}, {x: 650, y: 670}, {x: 580, y: 760});
// set first line end area

//letter_a.setMark({x: 27, y: 161}, {x: 93, y: 161}, {x: 50, y: 197});
letter_a.setMark({x: 190, y: 500}, {x: 300, y: 500}, {x: 230, y: 590});
// start of the second line

//letter_a.setMark({x: 124, y: 161}, {x: 188, y: 161}, {x: 163, y: 197});
letter_a.setMark({x: 440, y: 500}, {x: 560, y: 500}, {x: 515, y: 590});
// end of the second line

  var shapes = [
    [10814141, 10879677, 10879675, 11076277, 11469480, 12190349, 13107819, 14025284, 14811675, 15729137, 16515530, 17564065, 18416004, 19005802, 19464531, 19923259, 20250920, 20447521, 20906262, 21168399, 21430536, 21823743, 22216951, 22413556, 22675696, 22937835, 23134439, 23265509, 23396579, 23527648, 23724254, 23724253, 23724252, 23789788, 23855325, 23986402, 24314088, 24641776, 24969463, 25362690, 25821455, 26214685, 26607916, 27001151, 27590991, 28115292, 28639594, 29032821, 29163907, 29294998, 29819306, 30278078, 30802382, 31261148, 31719913, 32047607, 32571910, 33161749, 33686052, 33948207, 34210365, 34472518, 34800208, 34996824, 35258976, 35521127, 35914354, 36373121, 36962965, 37487268, 37814957, 37946037, 38142651, 38273727, 38339266, 38339267],
    [15729174, 15794710, 15860246, 16253462, 17629720, 19530265, 21758489, 23921176, 25690647, 27329047, 28574230, 29557269, 30212629, 30605844, 30999060, 31457812, 32375317, 33227285, 33882643, 34013714]
  ];

  for (var shape in shapes) {
    //console.log(shapes[shape]);
    add_shape(shapes[shape]);
  }

  //letter_arr.push(letter_a);
}

//letter_curr = letter_a;

function letter2() {
  letter_b = new Letter('B');
  // create letter A

  letter_b.setMark({x: 150, y: 200}, {x: 280, y: 200}, {x: 215, y: 280});
  // set start area

  letter_b.setMark({x: 150, y: 630}, {x: 280, y: 630}, {x: 215, y: 750});
  // set first line end area

  letter_b.setMark({x: 150, y: 200}, {x: 280, y: 200}, {x: 215, y: 280});
  // start of the second line

  letter_b.setMark({x: 150, y: 630}, {x: 280, y: 630}, {x: 215, y: 750});
  // end of the second line

  var shapes = [
    [13959376, 13959377, 13959378, 13959379, 13959382, 13959392, 13959399, 13959405, 13959413, 13959423, 13959439, 13893918, 13893938, 13893957, 13893973, 13893988, 13894002, 13894016, 13894030, 13894047, 13894061, 13894081, 13894092, 13894104, 13894115, 13828593, 13828607, 13763087, 13763103, 13763117, 13763131, 13763143, 13763156, 13763169, 13763182, 13763193, 13763204, 13828748, 13894291, 13894296, 13894300, 13894303, 13894308, 13894311, 13894314, 13894317, 13894320, 13894325, 13894329, 13894332, 13894334, 13894335, 13894336, 13894337, 13894338, 13894340, 13959877, 13959878],
    [14155997, 14287069, 14549213, 15204574, 16056542, 17432798, 19595486, 22085856, 24576228, 26607850, 28115184, 29229301, 30343420, 31064323, 31457545, 31719695, 31850774, 31850782, 32112939, 32178486, 32178497, 32178509, 32112987, 31981931, 31916411, 31719817, 31457682, 31064474, 30474659, 29819306, 29032881, 28115383, 27001273, 25166265, 23265721, 21365177, 19857849, 18743739, 17891773, 17367485, 16581055, 16187840, 16449984, 16843201, 17695171, 19530183, 22544842, 25297358, 27787731, 30147033, 32571873, 36569585, 37159413, 37487097, 37683711, 38011399, 38339089, 38666778, 38863395, 38994478, 38994490, 38732360, 38208085, 37552740, 36635251, 35783299, 34865807, 33817242, 32309925, 30671535, 29164215, 27919037, 26542783, 25297599, 23855807, 22348479, 21103296, 20185792, 19464896, 18875070, 18219708, 17367739, 16515768, 15663799, 15139510, 14746293, 14287541, 13632181, 12649141, 11928247, 11731640, 11731641]
  ];

  for (var shape in shapes) {
    add_shape(shapes[shape]);
  }
  letter_arr.push(letter_b);
}

function letter3() {
  letter_b = new Letter('C');
  // create letter A

  letter_b.setMark({x: 450, y: 290}, {x: 620, y: 290}, {x: 560, y: 400});
  // set start area

  letter_b.setMark({x: 490, y: 540}, {x: 650, y: 550}, {x: 550, y: 630});
  // set first line end area

  var shapes = [
    [37880156, 37814616, 37683540, 37355852, 36897087, 36372786, 35914021, 35324183, 34406665, 33358077, 32375026, 31391978, 30671075, 29819100, 29032663, 28115155, 27328721, 26411215, 25362637, 24248523, 23134410, 22085834, 21037258, 19857611, 18677965, 17826000, 17105108, 16646362, 16056545, 15532263, 15007984, 14549239, 14024960, 13631753, 13173011, 12648734, 12124457, 11796787, 11403582, 11272520, 11075923, 10879325, 10813797, 10682735, 10551673, 10486150, 10486165, 10486182, 10486198, 10486214, 10551765, 10748388, 10945011, 11141634, 11469329, 11797024, 12190253, 12649018, 13173317, 13763152, 14484055, 15073888, 15794793, 16384625, 17105529, 17826433, 18743945, 19595921, 20775577, 21758623, 23331494, 24380073, 25297578, 26084011, 27001515, 27853483, 28508843, 29426346, 30278311, 31261345, 32113307, 33030803, 33817226, 34472575, 35062388, 35652203, 36176478, 36700751, 37028417, 37159479, 37356080, 37552683, 37814822, 37945889, 38011422, 38076956, 38076955, 38142491, 38142489, 38208024]
  ];

  for (var shape in shapes) {
    add_shape(shapes[shape]);
  }
  letter_arr.push(letter_b);
}

function letter4() {
  letter_b = new Letter('D');
  // create letter A

  letter_b.setMark({x: 130, y: 190}, {x: 260, y: 190}, {x: 200, y: 280});
  // set start area

  letter_b.setMark({x: 130, y: 630}, {x: 260, y: 630}, {x: 200, y: 745});
  // set first line end area

  letter_b.setMark({x: 130, y: 190}, {x: 260, y: 190}, {x: 200, y: 280});
  // set start area

  letter_b.setMark({x: 130, y: 630}, {x: 260, y: 630}, {x: 200, y: 745});
  // set first line end area

  var shapes = [
    [12910800, 12910801, 12910806, 12910811, 12976355, 12976367, 12976379, 12976391, 12976404, 12976420, 12976439, 13041996, 13042018, 13042040, 13042059, 13042080, 13107637, 13304268, 13369825, 13435380, 13435393, 13435406, 13500957, 13566510, 13697600, 13763152, 13828698, 13828707, 13828715, 13828724, 13828732, 13828740, 13828751, 13763224, 13763235, 13763246, 13763256, 13763265, 13763267, 13763269, 13763270],
    [13107418, 13172955, 13500635, 14024923, 14680284, 15532252, 16384220, 17367261, 18415838, 19595488, 20644066, 21496036, 22282472, 23068909, 24183026, 25100535, 25886970, 27001087, 27590915, 28442888, 29950223, 30474515, 31654170, 32375073, 33751338, 34210094, 34996540, 35193153, 35324230, 35651925, 35914081, 36176239, 36372874, 36372887, 36372904, 36307381, 36176324, 36110805, 36045285, 35848693, 35652099, 35389968, 34996764, 34734631, 34472499, 34144830, 33882696, 33489487, 32572000, 31982185, 30605943, 29885056, 28705420, 28181137, 27198104, 26608283, 24969888, 24183459, 22348457, 21299883, 19399343, 18743984, 17302192, 16646832, 16188080, 15925936, 15598256, 15270576, 14811824, 14549680, 14287536, 14156464, 14025392, 13894320, 13697712]
  ];

  for (var shape in shapes) {
    add_shape(shapes[shape]);
  }
  letter_arr.push(letter_b);
}

function letter5() {
  letter_b = new Letter('E');
  // create letter A

  letter_b.setMark({x: 160, y: 180}, {x: 285, y: 180}, {x: 225, y: 270});
  letter_b.setMark({x: 485, y: 615}, {x: 590, y: 615}, {x: 520, y: 770});

  letter_b.setMark({x: 160, y: 180}, {x: 285, y: 180}, {x: 225, y: 270});
  letter_b.setMark({x: 510, y: 180}, {x: 600, y: 180}, {x: 550, y: 270});

  letter_b.setMark({x: 145, y: 390}, {x: 300, y: 390}, {x: 225, y: 500});
  letter_b.setMark({x: 495, y: 390}, {x: 580, y: 390}, {x: 530, y: 510});

  var shapes = [
    [14418137, 14418139, 14352607, 14352614, 14287088, 14287099, 14221576, 14221589, 14221603, 14221620, 14221636, 14221655, 14221676, 14221692, 14221711, 14221729, 14221747, 14221764, 14221780, 14221794, 14287345, 14352893, 14418442, 14483989, 14483999, 14484007, 14549553, 14549563, 14615108, 14615120, 14680663, 14680671, 14680678, 14811757, 14811766, 14877314, 14877320, 14877325, 14877329, 14877334, 14877338, 14877341, 14877342, 14942878, 14942879, 14942880, 15073954, 15139491, 15336101, 15598246, 16122535, 17236649, 18940588, 20775598, 22151856, 23528112, 24773296, 26280625, 27591345, 28770993, 29622961, 30474929, 31523505, 32572081, 33620657, 34472625, 34865841, 34931376, 34996912, 35062448, 35193520, 35455663, 35652271, 35783343, 35848879, 35979951, 36176559, 36307631, 36307630, 36438702],
    [14418145, 14483681, 14614753, 14811361, 15532257, 16384227, 17629413, 19005670, 22020328, 24183018, 26149101, 27656430, 28836078, 29819118, 30933230, 31719663, 32375023, 33489135, 34078959, 34734319, 35127533, 35324141, 35389677, 35455213, 35651821, 35848428, 35913964],
    [14287293, 14549437, 15008189, 15729085, 17039805, 19202493, 21889469, 25821626, 28246456, 30081463, 31982005, 33489332, 34668980, 35389876, 35914164, 36176308, 36241844]
  ];

  for (var shape in shapes) {
    add_shape(shapes[shape]);
  }
  letter_arr.push(letter_b);
}


