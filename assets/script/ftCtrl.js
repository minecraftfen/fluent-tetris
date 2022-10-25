// User Input Pauser
(() => {
  window.ft.ctrl = {
    keyList: [],
    dict:{
      ArrowUp:'up',
      ArrowDown:'down',
      ArrowLeft:'left',
      ArrowRight:'right',
      /*
      w:'up',
      a:'left',
      s:'down',
      d:'right',
      */
      z:'rotateLeft',
      c:'hold',
      ' ':'drop',
    },
    repeat:{
      s:{
        delay:0,
        interval:250,
      },
    },
    handlers: {
      keydown: (e) => {
        if(e.key in window.ft.ctrl.dict) p1.main.dropingBlock.move(window.ft.ctrl.dict[e.key]);
      },
    },
  };
})();
