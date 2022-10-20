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
      let table = window.ft.srs.blocks[block][area.replace(/^(next\d|hold)/, '').replace('x', 'cntHori').replace('y', 'cntVert')][rotateIndex];
      for (let i = 0; i < table.length; i++) {
        if (x + i < 0 || x + i > (area === 'cntVert' ? 19 : 20)) continue;
        for (let j = 0; j < table[i].length; j++) {
          if (y + j < 0 || y + j > (area === 'cntHori' ? 8 : 9)) continue;
          if (table[i][j]) window.ft.render.color(block.toLowerCase(), player, x + i, y + j, area, type);
        }
      }
    },
    renderBlock: (block, rotateIndex, player, x, y, type = true, meta = '', connect = true) => {
      if (meta !== '') rotateIndex = x = y = 0; // Reset
      rotateIndex = window.ft.render.rotate(rotateIndex);
      window.ft.render.renderTable(block, rotateIndex, player, x, y, `${meta}field`, type);
      window.ft.render.renderTable(block, rotateIndex, player, x, y, `${meta}x`, type);
      window.ft.render.renderTable(block, rotateIndex, player, x, y, `${meta}y`, type);
    },
    renderNext: (player, nextList) => {
      player = window.ft.tools.getPlayerID(player);
      window.ft.render.objects[player].next.innerHTML = window.ft.render.previewHTML.repeat(6);
      for (let i = 2; i < 8; i++) if (nextList[nextList.length - i]) ft.render.renderBlock(nextList[nextList.length - i], 0, player, 0, 0, true, `next${i - 2}`);
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
      window.ft.render.emptyTr = document.createElement("tr");
      const td = document.createElement("td");
      for (let i = 0; i < 10; i++) {
        if (i == 9) for (let i = 0; i < 21; i++) {
          window.ft.render.objects.p1.cntHori.appendChild(window.ft.render.emptyTr.cloneNode(true));
          window.ft.render.objects.p2.cntHori.appendChild(window.ft.render.emptyTr.cloneNode(true));
        }
        const tdobj = td.cloneNode(true);
        window.ft.render.emptyTr.appendChild(tdobj);
      }
      for (let i = 0; i < 21; i++) {
        const trobj = window.ft.render.emptyTr.cloneNode(true);
        window.ft.render.objects.p1.cntVert.appendChild(trobj.cloneNode(true));
        window.ft.render.objects.p2.cntVert.appendChild(trobj.cloneNode(true));
        trobj.style = `--row: ${20 - i};`;
        window.ft.render.objects.p1.field.appendChild(trobj.cloneNode(true));
        window.ft.render.objects.p2.field.appendChild(trobj);
      }
      // window.ft.render.objects.p1.next.innerHTML = window.ft.render.objects.p2.next.innerHTML = window.ft.render.previewHTML.repeat(6);
      window.ft.render.objects.p1.hold.innerHTML = window.ft.render.objects.p2.hold.innerHTML = window.ft.render.previewHTML;
    },
    objects: {
      locate: (player, x, y, area = 'field') => {
        player = window.ft.tools.getPlayerID(player);
        let meta = 'main', sub = null;
        if (area.search(/^next\d/) === 0) {
          meta = 'next';
          sub = parseInt(area[4], 10);
          area = area.slice(5);
        }
        if (area.search(/^hold/) === 0) {
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
          if (e instanceof ReferenceError || e instanceof TypeError) {
            throw new RangeError(`Unable to locate the specified object: block(${x},${y}) in ${player}'s '${area}'`);
          }
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
