window.ft = () => {
  if(window.ft.init) return;
  window.ft.copyright();
  window.ft.render.initobj();
  window.ft.init = true;
}
// Copyright
(() => {
  'use strict';
  window.ft.copyright = () => window.ft.copyright.console();
  window.ft.copyright.version = 'v0.0.0-alpha0000';
  window.ft.copyright.console = () => window.ft.copyright.console.logo();
  window.ft.copyright.console.logo = () => {
    console.log(`
%cT%cE%cT%cR%cI%cS%c
%c  %c

%cFluent Tetris
%c%s
`,
      "background-color:#2c3e50;font-size:1rem;padding:0.5rem 0 0.5rem 1.5rem;color:#e74c3c;",
      "background-color:#2c3e50;font-size:1rem;padding:0.5rem 0;color:#e67e22;",
      "background-color:#2c3e50;font-size:1rem;padding:0.5rem 0;color:#f1c40f;",
      "background-color:#2c3e50;font-size:1rem;padding:0.5rem 0;color:#2ecc71;",
      "background-color:#2c3e50;font-size:1rem;padding:0.5rem 0;color:#3498db;",
      "background-color:#2c3e50;font-size:1rem;padding:0.5rem 1.5rem 0.5rem 0;color:#9b59b6;",
      "",
      "background-color:#2c3e50;font-size:1rem;padding:0.5rem;margin-left:2rem;",
      "",
      "color: #888; font-size: 2em;",
      "color: #666; font-size: 1.5em;",
      window.ft.copyright.version,
    );
  };
})();

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
    let output = window.ft.srs.wallkick[block][key]
    console.assert(output, `Invalid Parameter "key": ${key}`);
    return output;
  }
  window.ft.srs.wallkick.dict = {
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
      wallkick: window.ft.srs.wallkick.arikaI,
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
      wallkick: window.ft.srs.wallkick.general,
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
      wallkick: window.ft.srs.wallkick.general,
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
      wallkick: window.ft.srs.wallkick.none,
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
      wallkick: window.ft.srs.wallkick.general,
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
      wallkick: window.ft.srs.wallkick.general,
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
      wallkick: window.ft.srs.wallkick.general,
    },
  }
})();

// Render
(() => {
  'use strict';
  window.ft.render = {
    main: () => { },
    connect: () => { },
    initobj: () => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");

      for (let i = 0; i < 9; i++) {
        if (i == 8) for (let i = 0; i < 21; i++) {
          window.ft.render.objects.p1.connect.horizontal.appendChild(tr.cloneNode(true));
          window.ft.render.objects.p2.connect.horizontal.appendChild(tr.cloneNode(true));
        }
        const tdobj = td.cloneNode(true);
        tdobj.style = `--col: ${i};`;
        tr.appendChild(tdobj);
      }
      for (let i = 0; i < 21; i++) {
        const trobj = tr.cloneNode(true);
        if (i == 0) trobj.classList.add("buffer", "disp");
        else {
          window.ft.render.objects.p1.connect.vertical.appendChild(trobj.cloneNode(true));
          window.ft.render.objects.p2.connect.vertical.appendChild(trobj.cloneNode(true));
        }
        trobj.style = `--row: ${20 - i};`;
        window.ft.render.objects.p1.field.appendChild(trobj.cloneNode(true));
        window.ft.render.objects.p2.field.appendChild(trobj);
      }
      window.ft.render.objects.p1.next.innerHTML = window.ft.render.objects.p2.next.innerHTML = window.ft.render.previewHTML.repeat(7);
      window.ft.render.objects.p1.hold.innerHTML = window.ft.render.objects.p2.hold.innerHTML = window.ft.render.previewHTML;
    },
    objects: {
      p1: {
        field: document.getElementById("p1f"),
        status: document.getElementById("p1s"),
        next: document.getElementById("p1n"),
        hold: document.getElementById("p1h"),
        connect: {
          horizontal: document.getElementById("p1ch"),
          vertical: document.getElementById("p1cv"),
        },
      },
      p2: {
        field: document.getElementById("p2f"),
        status: document.getElementById("p2s"),
        next: document.getElementById("p2n"),
        hold: document.getElementById("p2h"),
        connect: {
          horizontal: document.getElementById("p2ch"),
          vertical: document.getElementById("p2cv"),
        },
      },
    },
    previewHTML:`
      <table>
        <tbody class="field">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tbody class="connect cnt-hori">
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tbody class="connect cnt-vert">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>`,
    }
})();
