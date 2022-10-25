// These are for debug, and won't be loaded in production
(() => {
  window.ftTool = {};
  window.ftTool.children = (...args) => {
    if (args.length == 1 && Object.prototype.toString.call(args[0]) === '[object Array]')
      args = args[0];
    if (args.length == 1) return args[0];
    return window.ftTool.children([args[0].children[args[1]]].concat(args.slice(2)));
  };
  window.ftTool.checkblock = (block) => {
    if (window.ftTool.checkblock.stop) window.ftTool.checkblock.stop();
    if (block === undefined) return;
    window.ftTool.checkblock.stop = () => {
      clearInterval(window.ftTool.checkblock.intervalID);
      window.ft.render.renderBlock(window.ftTool.checkblock.b, window.ftTool.checkblock.a, 2, 3, 1, false);
      delete window.ftTool.checkblock.intervalID, window.ftTool.checkblock.stop;
    }
    window.ftTool.checkblock.a = 0;
    window.ftTool.checkblock.b = block;
    window.ftTool.checkblock.intervalID = setInterval(
      (() => {
        return () => {
          window.ft.render.renderBlock(window.ftTool.checkblock.b, window.ftTool.checkblock.a++, 2, 3, 1, false);
          window.ft.render.renderBlock(window.ftTool.checkblock.b, window.ftTool.checkblock.a, 2, 3, 1);
        }
      })(), 1000);
  }
  window.ftTool.addkbdEvent = () => {
    document.onkeyup = (e) => {
      if(e.key in window.ft.ctrl.dict) p1.main.dropingBlock.move(window.ft.ctrl.dict[e.key]);
    };
  }
  window.ftTool.structure = () => {
    document.querySelectorAll('.main .field').forEach((obj) => {
      obj.addEventListener('click', (e) => {
        if (e.target.tagName === 'TD')
          if (e.target.classList.length === 0)
            e.target.classList.add('trash');
          else for (let i = 0; i < e.target.classList.length; i++)
            e.target.classList.remove(e.target.classList[i]);
      });
    });
  }
})()
