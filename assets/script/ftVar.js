// SRS
(() => {
  'use strict';
  window.ft.srs = (redirect = false) => {
    // Execute this for help.
    if (redirect) window.ft.location.href = window.ft.srs.help.helpURL;
    console.log('Exectue "srs(true)" to see the documentations');
  };
  window.ft.srs.help = {
    helpURL: "https://github.com/minecraftfen/fluent-tetris/blob/main/docs/index.md",
  }
  /*
  N(one)  = No rotate    (index 0)
  R(ight) = Right rotate (index 1)
  T(wice) = rotate twice (index 2)
  L(eft)  = Left rotate  (index 3)
  */
  window.ft.srs.wallkick = (block, from = undefined, to = undefined) => {
    if (typeof block === 'string') block = window.ft.srs.wallkick.blockDefault[block.toUpperCase()];
    console.assert(block, `Invalid Parameter "block": ${block}`);
    let key;
    if (typeof from === 'string') key = from;
    else {
      console.assert(from >= 0 && from <= 3, `Invalid Parameter "from": ${from}`);
      console.assert(to >= 0 && to <= 3, `Invalid Parameter "to": ${to}`);
      key = window.ft.srs.wallkick.dict.from[from].to[to];
    }
    if(key === null) return [[0,0]];
    let output = window.ft.srs.wallkick[block][key];
    console.assert(output, `Invalid Parameter "key": ${key}`);
    return output;
  }
  window.ft.srs.wallkick.dict = {
    from: [
      {
        to: [ // index 0
          null,
          'N2R',
          undefined,
          'N2L',
        ]
      },
      {
        to: [ // index 1
          'R2N',
          null,
          'R2T',
          undefined,
        ]
      },
      {
        to: [ // index 2
          undefined,
          'T2L',
          null,
          'T2R',
        ]
      },
      {
        to: [ // index 3
          'L2N',
          undefined,
          'L2T',
          null,
        ]
      },
    ]
  }
  window.ft.srs.wallkick.none = {
    N2R: [[0, 0]], R2N: [[0, 0]], R2T: [[0, 0]], T2R: [[0, 0]],
    T2L: [[0, 0]], L2T: [[0, 0]], L2N: [[0, 0]], N2L: [[0, 0]]
  }
  window.ft.srs.wallkick.general = {
    N2R: [[0, 0], [-1, 0], [-1, +1], [0, -2], [-1, -2]],
    R2N: [[0, 0], [+1, 0], [+1, -1], [0, +2], [+1, +2]],
    R2T: [[0, 0], [+1, 0], [+1, -1], [0, +2], [+1, +2]],
    T2R: [[0, 0], [-1, 0], [-1, +1], [0, -2], [-1, -2]],
    T2L: [[0, 0], [+1, 0], [+1, +1], [0, -2], [+1, -2]],
    L2T: [[0, 0], [-1, 0], [-1, -1], [0, +2], [-1, +2]],
    L2N: [[0, 0], [-1, 0], [-1, -1], [0, +2], [-1, +2]],
    N2L: [[0, 0], [+1, 0], [+1, +1], [0, -2], [+1, -2]],
  }
  window.ft.srs.wallkick.i = {
    N2R: [[0, 0], [-2, 0], [+1, 0], [-2, -1], [+1, +2]],
    R2N: [[0, 0], [+2, 0], [-1, 0], [+2, +1], [-1, -2]],
    R2T: [[0, 0], [-1, 0], [+2, 0], [-1, +2], [+2, -1]],
    T2R: [[0, 0], [+1, 0], [-2, 0], [+1, -2], [-2, +1]],
    T2L: [[0, 0], [+2, 0], [-1, 0], [+2, +1], [-1, -2]],
    L2T: [[0, 0], [-2, 0], [+1, 0], [-2, -1], [+1, +2]],
    L2N: [[0, 0], [+1, 0], [-2, 0], [+1, -2], [-2, +1]],
    N2L: [[0, 0], [-1, 0], [+2, 0], [-1, +2], [+2, -1]],
  }
  window.ft.srs.wallkick.arikaI = {
    N2R: [[0, 0], [-2, 0], [+1, 0], [+1, +2], [-2, -1]],
    R2N: [[0, 0], [+2, 0], [-1, 0], [+2, +1], [-1, -2]],
    R2T: [[0, 0], [-1, 0], [+2, 0], [-1, +2], [+2, -1]],
    T2R: [[0, 0], [-2, 0], [+1, 0], [-2, +1], [+1, -1]],
    T2L: [[0, 0], [+2, 0], [-1, 0], [+2, +1], [-1, -1]],
    L2T: [[0, 0], [+1, 0], [-2, 0], [+1, +2], [-2, -1]],
    L2N: [[0, 0], [-2, 0], [+1, 0], [-2, +1], [+1, -2]],
    N2L: [[0, 0], [+2, 0], [-1, 0], [-1, +2], [+2, -1]],
  }
  window.ft.srs.wallkick.blockDefault = {
    I: 'arikaI',
    J: 'general',
    L: 'general',
    O: 'none',
    S: 'general',
    T: 'general',
    Z: 'general',
  }
  window.ft.srs.blocks = {
    I: {
      field: [
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
      cntHori: [
        [
          [0, 0, 0],
          [1, 1, 1],
        ],
        [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
        [
          [0, 0, 0],
          [0, 0, 0],
          [1, 1, 1],
        ],
        [
          [0],
          [0],
          [0],
          [0],
        ],
      ],
      cntVert: [
        [
          [0, 0, 0, 0],
        ],
        [
          [0, 0, 1],
          [0, 0, 1],
          [0, 0, 1],
        ],
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1],
          [0, 1],
          [0, 1],
        ],
      ],
      initialY: 3,
      wallkick: window.ft.srs.wallkick.arikaI,
    },
    J: {
      field: [
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
      cntHori: [
        [
          [0, 0],
          [1, 1],
        ],
        [
          [0, 1],
          [0, 0],
          [0, 0],
        ],
        [
          [0, 0],
          [1, 1],
          [0, 0],
        ],
        [
          [0],
          [0],
          [1],
        ],
      ],
      cntVert: [
        [
          [1, 0, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 0, 0],
          [0, 0, 1],
        ],
        [
          [0, 1],
          [0, 1],
        ],
      ],
      initialY: 3,
      wallkick: window.ft.srs.wallkick.general,
    },
    L: {
      field: [
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
      cntHori: [
        [
          [0, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [0, 0],
          [0, 1],
        ],
        [
          [0, 0],
          [1, 1],
          [0, 0],
        ],
        [
          [1],
          [0],
          [0],
        ],
      ],
      cntVert: [
        [
          [0, 0, 1],
        ],
        [
          [0, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 0, 0],
          [1, 0, 0],
        ],
        [
          [0, 1],
          [0, 1],
        ],
      ],
      initialY: 3,
      wallkick: window.ft.srs.wallkick.general,
    },
    O: {
      field: [
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
      cntHori: [
        [[1], [1]],
        [[1], [1]],
        [[1], [1]],
        [[1], [1]],
      ],
      cntVert: [
        [[1, 1]],
        [[1, 1]],
        [[1, 1]],
        [[1, 1]],
      ],
      initialY: 4,
      wallkick: window.ft.srs.wallkick.none,
    },
    S: {
      field: [
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
      cntHori: [
        [
          [0, 1],
          [1, 0],
        ],
        [
          [0, 0],
          [0, 1],
          [0, 0],
        ],
        [
          [0, 0],
          [0, 1],
          [1, 0],
        ],
        [
          [0],
          [1],
          [0],
        ],
      ],
      cntVert: [
        [
          [0, 1, 0],
        ],
        [
          [0, 1, 0],
          [0, 0, 1],
        ],
        [
          [0, 0, 0],
          [0, 1, 0],
        ],
        [
          [1, 0],
          [0, 1],
        ],
      ],
      initialY: 3,
      wallkick: window.ft.srs.wallkick.general,
    },
    T: {
      field: [
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
      cntHori: [
        [
          [0, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [0, 0],
        ],
        [
          [0, 0],
          [1, 1],
          [0, 0],
        ],
        [
          [0],
          [1],
          [0],
        ],
      ],
      cntVert: [
        [
          [0, 1, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 0, 0],
          [0, 1, 0],
        ],
        [
          [0, 1],
          [0, 1],
        ],
      ],
      initialY: 3,
      wallkick: window.ft.srs.wallkick.general,
    },
    Z: {
      field: [
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
      cntHori: [
        [
          [1, 0],
          [0, 1],
        ],
        [
          [0, 0],
          [0, 1],
          [0, 0],
        ],
        [
          [0, 0],
          [1, 0],
          [0, 1],
        ],
        [
          [0],
          [1],
          [0],
        ],
      ],
      cntVert: [
        [
          [0, 1, 0],
        ],
        [
          [0, 0, 1],
          [0, 1, 0],
        ],
        [
          [0, 0, 0],
          [0, 1, 0],
        ],
        [
          [0, 1],
          [1, 0],
        ],
      ],
      initialY: 3,
      wallkick: window.ft.srs.wallkick.general,
    },
  }
})();
