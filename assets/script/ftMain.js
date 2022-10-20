// Fluent Tetris Library
// TODO: rename positioning variables (x and y have been reversed)
window.ft = {};
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

// BlockObj
(() => {
  'use strict';
  window.ft.block = class {
    constructor(block, player = 1, x = -1, y = null) {
      this.block = block;
      this.rotateIndex = 0;
      this.player = player;
      this.playerObj = document.getElementById(window.ft.tools.getPlayerID(this.player));
      this.x = x;
      this.y = y === null ? window.ft.srs.blocks[block].initialY : y;
      this.floored = false;
      this.locked = null; // Accapted: null (not grounded), false(clocking), true(locked)
      this.lockTick = null; // A UNIX Time shows when does lock clock start
      this.lockTimeout = 500;
      this.lockCheckID = null;
      this.lockResetChance = 15; // restore when drop
      // this.rotateStored = null; // Accapted: null, "L", "R"
      this.actTick = null; // A UNIX Time shows when does lock clock start
      this.kbdAct = {
        w: () => [null, null, this.rotateIndex + 1],
        a: () => [null, this.y - 1, null],
        s: () => [this.x + 1, null, null],
        d: () => [null, this.y + 1, null],
        ' ': () => {
          this.hardDrop();
          return null;
        },
        z: () => {
          this.playerObj.main.holdAct();
          return null;
        },
        c: () => [null, null, this.rotateIndex - 1],
        // '180': () => [null, null, this.rotateIndex + 2],
      }
      this.stickAct = {
        w: () => {
          this.hardDrop();
          return false;
        },
        a: () => [null, this.y - 1, null],
        s: () => [this.x + 1, null, null],
        d: () => [null, this.y + 1, null],
        // '180': () => [null, null, this.rotateIndex + 2],
      }
      if (this.hitCheck()) this.playerObj.main.fail();
      this.renderSelf();
    }
    move(dir) {
      if (Object.keys(this.kbdAct).indexOf(dir) === -1) return;
      let out;
      let act = this.kbdAct[dir]();
      if (act) {
        if (act[0] === null && this.lockResetChance <= 0) return false;
        this.renderSelf(false);
        out = this.moveCheck(act[0], act[1], act[2]);
        if (out) {
          this.lockTick = new Date().getTime();
          if (act[0] !== null) this.lockResetChance = 15;
          else this.lockResetChance--;
          [this.x, this.y] = out;
          if (act[2] !== null) this.rotateIndex = window.ft.render.rotate(act[2]);
        }/* else {
          if(act[2] !== null) {
            if(this.rotateStored + act[2] - this.rotateIndex === 2) {

            }
            this.rotateStored = act[2] - this.rotateIndex;
          }
        }*/
      } else {
        if (act === null) return;
      }
      this.checkFloor();
      this.renderSelf(true);
      return out;
    }
    checkFloor() {
      this.floored = this.hitCheck(this.x + 1, null, null);
      if (this.floored) {
        this.locked = false;
        this.lockCheckID = window.ftmgr.register(
          (_t, v) => { v.checkLock() },
          0, this.dropInterval, true, this
        );
      }
      else if (this.locked !== null) {
        window.ftmgr.unregister(this.lockCheckID);
        this.locked = null;
      }
    }
    checkLock() {
      if (this.lockTick + this.lockTimeout < new Date().getTime()) this.lock();
    }
    lock() {
      this.playerObj.main.checkClear();
      this.playerObj.main.dropingBlock = new window.ft.block(this.playerObj.main.popNext(), this.player);
      this.playerObj.main.holdReleased = false;
      delete this;
    }
    checkVars(X, Y, R) {
      R = window.ft.render.rotate(R);
      return [X !== null ? X : this.x, Y !== null ? Y : this.y, R !== null ? R : this.rotateIndex];
    }
    moveCheck(newX = null, newY = null, newRotateIndex = null) {
      let CheckX, CheckY, CheckRotateIndex;
      [CheckX, CheckY, CheckRotateIndex] = this.checkVars(newX, newY, newRotateIndex);
      let wks;
      if (this.rotateIndex === CheckRotateIndex) wks = [[0, 0]];
      else wks = window.ft.srs.wallkick(
        this.block,
        this.rotateIndex,
        CheckRotateIndex
      );
      let canmove = false, finalX, finalY;
      for (let i = 0; i < wks.length; i++) {
        const wk = wks[i];
        if (!this.hitCheck(CheckX + wk[1], CheckY + wk[0], CheckRotateIndex)) {
          finalX = CheckX + wk[1];
          finalY = CheckY + wk[0];
          canmove = true;
          break;
        }
      }
      return canmove ? [finalX, finalY] : false;
    }
    hitCheck(newX = null, newY = null, newRotateIndex = null) {
      let CheckX, CheckY, CheckRotateIndex;
      [CheckX, CheckY, CheckRotateIndex] = this.checkVars(newX, newY, newRotateIndex);
      let table = window.ft.srs.blocks[this.block].field[CheckRotateIndex];
      let hit = false;
      for (let i = 0; i < table.length; i++) {
        if (CheckX + i == -1) continue;
        for (let j = 0; j < table[i].length; j++) {
          if (table[i][j]) {
            if (CheckX + i < 0 || CheckX + i > 20) {
              hit = true;
              break;
            };
            if (CheckY + j < 0 || CheckY + j > 9) {
              hit = true;
              break;
            };
            if (
              window.ft.render.objects.locate(
                this.player,
                CheckX + i,
                CheckY + j,
                'field'
              ).classList.length !== 0
            ) {
              hit = true;
              break;
            }
          }
        }
      }
      return hit;
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
    hardDrop() {
      while (this.move('s')) { };
      this.lock();
    }
  };
})();

// main
(() => {
  window.ft.main = class {
    constructor(player) {
      this.player = player;
      this.next = window.ft.tools.shuffle();
      this.dropingBlock = new window.ft.block(this.popNext(), this.player);
      this.field = [];
      this.dropInterval = 1000 // in ms
      this.hold = null;
      this.holdReleased = false;
      // this.nextAutoSoftDrop = 0;
      let temp = [];
      for (var i = 0; i < 10; i++) temp.push([]);
      for (var i = 0; i < 20; i++) this.field.push(temp);
      this.dropID = window.ftmgr.register((t, v) => { v.dropingBlock.move('s'); }, 0, this.dropInterval, true, this);
    }
    holdAct() {
      if (this.holdReleased) return;
      let next;
      if (this.hold) next = this.hold;
      else next = this.popNext();
      this.hold = this.dropingBlock.block;
      this.dropingBlock.renderSelf(false);
      window.ft.render.objects[window.ft.tools.getPlayerID(
        this.player
      )].hold.innerHTML = window.ft.render.previewHTML;
      window.ft.render.renderBlock(
        this.hold,
        0,
        this.player,
        0,
        0,
        true,
        'hold'
      );
      this.dropingBlock = new window.ft.block(next, this.player);
    }
    popNext() {
      if (this.next.length <= 7)
        this.next = window.ft.tools.shuffle().concat(this.next);
      window.ft.render.renderNext(this.player, this.next);
      return this.next.pop();
    }
    fail() {
      window.ftmgr.unregister(this.dropID);
      console.log('failed');

      // TODO: WTF is this? That can't be a proper solution
      this.dropingBlock.playerObj.classList.add('fail');
      delete this;
    };
    checkClear() {
      let obj = window.ft.render.objects[window.ft.tools.getPlayerID(this.player)];
      for (let i = 0; i < obj.field.children.length; i++) {
        let clear = true;
        for (let j = 0; j < obj.field.children[i].children.length; j++)
          if (obj.field.children[i].children[j].classList.length === 0) {
            clear = false;
            break;
          }
        if (clear) {
          for (let j = 0; j < obj.field.children[i].children.length; j++) {
            const color = obj.field.children[i].children[j].classList[0];
            if (color) {
              obj.cntVert.children[i - 1].children[j].classList.remove(color);
            }
          }
          obj.field.removeChild(obj.field.children[i]);
          obj.cntHori.removeChild(obj.cntHori.children[i]);
          obj.cntVert.removeChild(obj.cntVert.children[i]);
          obj.field.insertBefore(
            window.ft.render.emptyTr.cloneNode(true),
            obj.field.children[0]
          );
          obj.cntVert.insertBefore(
            window.ft.render.emptyTr.cloneNode(true),
            obj.cntVert.children[0]
          );
          let tmp = window.ft.render.emptyTr.cloneNode(true);
          tmp.removeChild(tmp.children[0]);
          obj.cntHori.insertBefore(tmp, obj.cntHori.children[0]);
        }
      }
    }
  };

})();

// Tools
(() => {
  'use strict';
  window.ft.tools = {};
  window.ft.tools.shuffle =
    (arr = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']) => {
      let i = arr.length;
      while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
      }
      return arr;
    }
  window.ft.tools.getPlayerID = (id) => {
    if (Object.prototype.toString.call(id) === '[object Number]') id = `p${id}`;
    return id;
  }
})();
