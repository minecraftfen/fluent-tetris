// Fluent Tetris Library
window.ft = () => {
  if (window.ft.init) return;
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

// Render
(() => {
  'use strict';
  window.ft.render = {
    main: () => { },
    connect: () => { },
    rotate: (rotateIndex) => {
      if (rotateIndex < -4) throw RangeError(`Invalid rotation: ${rotateIndex}`);
      if (rotateIndex < 0) rotateIndex = 4 + rotateIndex;
      else if (rotateIndex >= 4) rotateIndex %= 4;
      return rotateIndex;
    },
    renderTable: (block, rotateIndex, player, x, y, area = 'field', type = true) => {
      let subarea = undefined;
      if (area === 'x' || area === 0) area = 'cntHori';
      else if (area === 'y' || area === 1) area = 'cntVert';
      let table = window.ft.srs.blocks[block][area.replace(/^(next\d|hold)/,'').replace('x','cntHori').replace('y','cntVert')][rotateIndex];
      for (let i = 0; i < table.length; i++) {
        if (x + i < 0) continue;
        for (let j = 0; j < table[i].length; j++) {
          if (y + j < 0) continue;
          if (table[i][j]) window.ft.render.color(block.toLowerCase(), player, x + i, y + j, area, type);
        }
      }
    },
    renderBlock: (block, rotateIndex, player, x, y, type = true, meta = '', connect = true) => {
      if (meta !== '') rotateIndex = x = y = 0; // Reset For preview
      rotateIndex = window.ft.render.rotate(rotateIndex);
      window.ft.render.renderTable(block, rotateIndex, player, x, y, `${meta}field`, type);
      window.ft.render.renderTable(block, rotateIndex, player, x, y, `${meta}x`, type);
      window.ft.render.renderTable(block, rotateIndex, player, x, y, `${meta}y`, type);
    },
    renderNext: (player,nextList) => {
      for (let i = 0; i < 6; i++) if(nextList[i]) ft.render.renderBlock(nextList[i],0,player,0,0,true,`next${i}`);
    },
    color: (cls, player, x, y, area = 'field', type = true) => {
      let obj = window.ft.render.objects.locate(player, x, y, area).classList;
      if (type) {
        obj.remove('i', 'j', 'l', 'o', 's', 'z', 't');
        obj.add(cls);
      }
      else obj.remove(cls);
    },
    initobj: async () => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      for (let i = 0; i < 10; i++) {
        if (i == 9) for (let i = 0; i < 21; i++) {
          window.ft.render.objects.p1.cntHori.appendChild(tr.cloneNode(true));
          window.ft.render.objects.p2.cntHori.appendChild(tr.cloneNode(true));
        }
        const tdobj = td.cloneNode(true);
        tr.appendChild(tdobj);
      }
      for (let i = 0; i < 21; i++) {
        const trobj = tr.cloneNode(true);
        if (i == 0) trobj.classList.add("buffer", "disp");
        else {
          window.ft.render.objects.p1.cntVert.appendChild(trobj.cloneNode(true));
          window.ft.render.objects.p2.cntVert.appendChild(trobj.cloneNode(true));
        }
        trobj.style = `--row: ${20 - i};`;
        window.ft.render.objects.p1.field.appendChild(trobj.cloneNode(true));
        window.ft.render.objects.p2.field.appendChild(trobj);
      }
      window.ft.render.objects.p1.next.innerHTML = window.ft.render.objects.p2.next.innerHTML = window.ft.render.previewHTML.repeat(6);
      window.ft.render.objects.p1.hold.innerHTML = window.ft.render.objects.p2.hold.innerHTML = window.ft.render.previewHTML;
    },
    objects: {
      locate: (player, x, y, area = 'field') => {
        if (Object.prototype.toString.call(player) === '[object Number]') player = `p${player}`;
        let meta = 'main', sub = null;
        if (area.search(/^next\d/) === 0) {
          meta = 'next';
          sub = parseInt(area[4], 10);
          area = area.slice(5);
        }
        if(area.search(/^hold/) === 0) {
          meta = 'hold';
          area = area.slice(4);
        }
        if (area === 'x' || area === 0) {
          area = 'cntHori';
        }
        else if (area === 'y' || area === 1) {
          area = 'cntVert';
        }
        try {
          return ft.render.objects[player].querySelectorAll(`.${meta} .${area}`)
          [sub ? sub : 0].children[x].children[y];
          // return window.ft.render.objects[player][area].children[x].children[y];
        } catch (e) {
          if (e instanceof ReferenceError || e instanceof TypeError) throw new RangeError(`Unable to locate the specified object: block(${x},${y}) in ${player}'s '${area}'`);
          else throw e;
        }
      },
    },
    previewHTML: `
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
        <tbody class="connect cntHori">
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
        <tbody class="connect cntVert">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>`,
  }
  window.ft.render.objects.p1 = document.getElementById('p1');
  window.ft.render.objects.p2 = document.getElementById('p2');
  window.ft.render.objects.p1.field = document.getElementById("p1f");
  window.ft.render.objects.p1.status = document.getElementById("p1s");
  window.ft.render.objects.p1.next = document.getElementById("p1n");
  window.ft.render.objects.p1.hold = document.getElementById("p1h");
  window.ft.render.objects.p1.cntHori = document.getElementById("p1ch");
  window.ft.render.objects.p1.cntVert = document.getElementById("p1cv");
  window.ft.render.objects.p2.field = document.getElementById("p2f");
  window.ft.render.objects.p2.status = document.getElementById("p2s");
  window.ft.render.objects.p2.next = document.getElementById("p2n");
  window.ft.render.objects.p2.hold = document.getElementById("p2h");
  window.ft.render.objects.p2.cntHori = document.getElementById("p2ch");
  window.ft.render.objects.p2.cntVert = document.getElementById("p2cv");
})();

// BlockObj
(() => {
  window.ft.block = class {
    constructor(block, player = 1, x = 0, y = null) {
      this.block = block;
      this.rotateIndex = 0;
      this.player = player;
      this.x = x;
      this.y = y === null ? window.ft.srs.blocks[block].initialY : y;
      this.floored = false;
      this.locked = null; // Accapted: null (not grounded), false(clocking), true(locked)
      this.lockTick = null; // A UNIX Time shows when does lock clock start
      this.lockResetChance = 15; // restore when stop
      this.rotateStored = null; // Accapted: null, "L", "R"
      this.renderSelf();
      this.move.actTick = null; // A UNIX Time shows when does lock clock start
      this.move.keyAct = {
        w: () => this.rotateIndex++,
        a: () => this.y--,
        s: () => this.x++,
        d: () => this.y++
      }
      this.move.stickAct = {
        w: () => this.hardDrop(),
        a: () => this.y--,
        s: () => this.x++,
        d: () => this.y++
      }
    }
    move(dir) {
      if (['w', 'a', 's', 'd'].indexOf(dir) === -1) throw new RangeError(`Invalid direction: ${dir}`);
      this.renderSelf(false);
      this.move.stickAct[dir]();
      this.renderSelf(true);
    }
    hitCheck(newX = null, newY = null) {
      CheckX = newX === null ? newX : this.x;
      CheckY = newY === null ? newY : this.y;
    }
    renderSelf(type = true) {
      window.ft.render.renderBlock(
        this.block,
        this.rotateIndex,
        this.player,
        this.x,
        this.y,
        type
      );
    }
  };
})();

// main
(() => {
  window.ft.main = class {
    constructor(player) {
      this.player = player;
      this.next = window.ft.tools.shuffle();
      this.dropingBlock = new window.ft.block(this.popNext(),this.player);
      this.field = [];
      this.dropInterval = 500 // in ms
      this.nextAutoSoftDrop = new Date().getTime() + this.dropInterval;
      let temp = [];
      for (var i = 0; i < 10; i++) temp.push([]);
      for (var i = 0; i < 20; i++) this.field.push(temp);
      window.ft.render.renderNext(this.player,this.next);
    }
    popNext() {
      if (this.next.length < 7) this.next = window.ft.tools.shuffle().concat(this.next);
      window.ft.render.renderNext(this.player,this.next);
      return this.next.pop();
    }
  };
})();

// Tools
(() => {
  'use strict';
  window.ft.tools = {};
  window.ft.tools.shuffle = (arr = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']) => {
    let i = arr.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
})();
