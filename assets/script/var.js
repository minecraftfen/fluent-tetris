// SRS
window.srs = (redirect = false) => {
  // Execute this for help.
  if(redirect) {}
  console.log(window.srs.help.intro);
};
window.srs.help = {
  intro: ""
}
/*
N(one)  = No rotate    (index 0)
R(ight) = Right rotate (index 1)
T(wice) = rotate twice (index 2)
L(eft)  = Left rotate  (index 3)
*/
window.srs.wallkick = (block, from = undefined, to = undefined) => {
  if (typeof block === 'string') block = window.srs.wallkick.blockDefault[block.toUpperCase()];
  console.assert(block, `Invalid Parameter "block": ${block}`);
  let key;
  if (typeof from === 'string') key = from;
  else {
    console.assert(from >= 0 && from <= 3, `Invalid Parameter "from": ${from}`);
    console.assert(to >= 0 && to <= 3, `Invalid Parameter "to": ${to}`);
    key = window.srs.wallkick.dict.from[from].to[to];
  }
  let output = window.srs.wallkick[block][key]
  console.assert(output, `Invalid Parameter "key": ${key}`);
  return output;
}
window.srs.wallkick.dict = {
  from: [
    {
      to: [ // index 0
        undefined,
        'N2R',
        undefined,
        'N2L',
      ]
    },
    {
      to: [ // index 1
        'R2N',
        undefined,
        'R2T',
        undefined,
      ]
    },
    {
      to: [ // index 2
        undefined,
        'T2L',
        undefined,
        'T2R',
      ]
    },
    {
      to: [ // index 3
        'L2N',
        undefined,
        'L2T',
        undefined,
      ]
    },
  ]
}

window.srs.wallkick.none = {
  N2R: [[0, 0]], R2N: [[0, 0]], R2T: [[0, 0]], T2R: [[0, 0]],
  T2L: [[0, 0]], L2T: [[0, 0]], L2N: [[0, 0]], N2L: [[0, 0]]
}
window.srs.wallkick.general = {
  N2R: [[0, 0], [-1, 0], [-1, +1], [0, -2], [-1, -2]],
  R2N: [[0, 0], [+1, 0], [+1, -1], [0, +2], [+1, +2]],
  R2T: [[0, 0], [+1, 0], [+1, -1], [0, +2], [+1, +2]],
  T2R: [[0, 0], [-1, 0], [-1, +1], [0, -2], [-1, -2]],
  T2L: [[0, 0], [+1, 0], [+1, +1], [0, -2], [+1, -2]],
  L2T: [[0, 0], [-1, 0], [-1, -1], [0, +2], [-1, +2]],
  L2N: [[0, 0], [-1, 0], [-1, -1], [0, +2], [-1, +2]],
  N2L: [[0, 0], [+1, 0], [+1, +1], [0, -2], [+1, -2]],
}
window.srs.wallkick.i = {
  N2R: [[0, 0], [-2, 0], [+1, 0], [-2, -1], [+1, +2]],
  R2N: [[0, 0], [+2, 0], [-1, 0], [+2, +1], [-1, -2]],
  R2T: [[0, 0], [-1, 0], [+2, 0], [-1, +2], [+2, -1]],
  T2R: [[0, 0], [+1, 0], [-2, 0], [+1, -2], [-2, +1]],
  T2L: [[0, 0], [+2, 0], [-1, 0], [+2, +1], [-1, -2]],
  L2T: [[0, 0], [-2, 0], [+1, 0], [-2, -1], [+1, +2]],
  L2N: [[0, 0], [+1, 0], [-2, 0], [+1, -2], [-2, +1]],
  N2L: [[0, 0], [-1, 0], [+2, 0], [-1, +2], [+2, -1]],
}
window.srs.wallkick.arikaI = {
  N2R: [[0, 0], [-2, 0], [+1, 0], [+1, +2], [-2, -1]],
  R2N: [[0, 0], [+2, 0], [-1, 0], [+2, +1], [-1, -2]],
  R2T: [[0, 0], [-1, 0], [+2, 0], [-1, +2], [+2, -1]],
  T2R: [[0, 0], [-2, 0], [+1, 0], [-2, +1], [+1, -1]],
  T2L: [[0, 0], [+2, 0], [-1, 0], [+2, +1], [-1, -1]],
  L2T: [[0, 0], [+1, 0], [-2, 0], [+1, +2], [-2, -1]],
  L2N: [[0, 0], [-2, 0], [+1, 0], [-2, +1], [+1, -2]],
  N2L: [[0, 0], [+2, 0], [-1, 0], [-1, +2], [+2, -1]],
}
window.srs.wallkick.blockDefault = {
  I: 'arikaI',
  J: 'general',
  L: 'general',
  O: 'none',
  S: 'general',
  T: 'general',
  Z: 'general',
}
window.srs.blocks = {
  I: {
    shapes: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      [
        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1],
      ],
    ],
    wallkick: window.srs.wallkick.arikaI,
  },
  J: {
    shapes: [
      [
        [1, 0, 0],
        [1, 1, 1],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1],
        [0, 1],
        [1, 1],
      ],
    ],
    wallkick: window.srs.wallkick.general,
  },
  L: {
    shapes: [
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1],
        [0, 1],
        [0, 1],
      ],
    ],
    wallkick: window.srs.wallkick.general,
  },
  O: {
    shapes: [
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
    ],
    wallkick: window.srs.wallkick.none,
  },
  S: {
    shapes: [
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    ],
    wallkick: window.srs.wallkick.general,
  },
  T: {
    shapes: [
      [
        [0, 1, 0],
        [1, 1, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [0, 1],
      ],
    ],
    wallkick: window.srs.wallkick.general,
  },
  Z: {
    shapes: [
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    ],
    wallkick: window.srs.wallkick.general,
  },
}
