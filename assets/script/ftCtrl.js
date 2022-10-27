// User Input Pauser
(() => {
  window.ft.ctrl = {
    keyList: {},
    dict: {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      /*
      w:'up',
      a:'left',
      s:'down',
      d:'right',
      */
      z: 'rotateLeft',
      c: 'hold',
      ' ': 'drop',
    },
    repeat: {
      down: {
        repeat: true,
        delay: () => p1.main.dropInterval / 20,
        interval: () => p1.main.dropInterval / 20,
      },
      left: {
        repeat: true,
        delay: () => 150,
        interval: () => 50,
      },
      right: {
        repeat: true,
        delay: () => 150,
        interval: () => 50,
      }
    },
    handlers: {
      keydown: (e) => {
        if (window.ft.ctrl.dict[e.key] === undefined) return;
        let key = window.ft.ctrl.dict[e.key];
        if(
          window.ft.ctrl.keyList[key] === false ||
          window.ft.ctrl.keyList[key] === true ||
          typeof window.ft.ctrl.keyList[key] === 'number'
        ) return;
        if(p1.main.dropingBlock) p1.main.dropingBlock.move(key);
        if (window.ft.ctrl.repeat[key] && window.ft.ctrl.repeat[key].repeat)
          window.ft.ctrl.keyList[key] = true;
      },
      keyup: (e) => {
        if (window.ft.ctrl.dict[e.key] === undefined) return;
        let key = window.ft.ctrl.dict[e.key];
        window.ft.ctrl.keyList[key] = false;
        delete window.ft.ctrl.keyList[key];
      },
      frame: (t) => {
        let obj = window.ft.ctrl.keyList;
        for (key in obj) {
          if (obj[key] === false) return;
          if (obj[key] === true) {
            obj[key] = t + window.ft.ctrl.repeat[key].delay();
            return;
          }
          if (obj[key] < t) {
            obj[key] = t + window.ft.ctrl.repeat[key].interval();
            p1.main.dropingBlock.move(key);
          }
        }
      },
    },
    bind: () => {
      document.addEventListener('keydown', window.ft.ctrl.handlers.keydown);
      document.addEventListener('keyup', window.ft.ctrl.handlers.keyup);
    },
  };
  window.ft.ctrl.checkID = window.ftmgr.register(window.ft.ctrl.handlers.frame, 0);
})();
