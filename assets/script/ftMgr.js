// Future Task Manager
(() => {
  window.ftmgr = {};
  window.ftmgr.workload = [];
  window.ftmgr.started = false;
  window.ftmgr.register = (handler, repeat = null, async = true, handlerVars = {}) => {
    if (typeof handler !== 'function') throw new TypeError('"Handler" must be a function');

    if (repeat !== null && typeof repeat !== 'number') throw new TypeError('"Repeat" must be a number');
    window.ftmgr.started = true;
    window.requestAnimationFrame(window.ftmgr.frameHandler);
    return window.ftmgr.workload.push({
      handler: handler,
      timestamp: false,
      repeat: repeat,
      async: async,
      handlerVars: handlerVars,
    }) - 1;
  };
  window.ftmgr.unregister = (id) => {
    return delete window.ftmgr.workload[id];
  };
  window.ftmgr.frameHandler = (timestamp) => {
    if (!window.ftmgr.started) return;
    try{
    let valid = false;
    for (let i = 0; i < window.ftmgr.workload.length; i++) // Check All Workloads
      if (window.ftmgr.workload[i] !== undefined) { // Check is it valid
        valid = true;
        if (window.ftmgr.workload[i].timestamp < timestamp) { // Check should it triggered
          if (window.ftmgr.workload[i].async) // Check is it async
            (async () => {return window.ftmgr.workload[i].handler(timestamp, window.ftmgr.workload[i].handlerVars)})(); // Async call
          else window.ftmgr.workload[i].handler(
            timestamp,
            window.ftmgr.workload[i].handlerVars
          )
          if (window.ftmgr.workload[i].repeat !== null) // Check should it be deleted
            window.ftmgr.workload[i].timestamp = timestamp + window.ftmgr.workload[i].repeat; // Repeat
          else delete window.ftmgr.workload[i]; // Delete
        }
      }
    window.ftmgr.started = valid;
    } catch (e) {
      if (!(e instanceof TypeError && e.message.search(/^Cannot read properties of undefined \(reading/) === 0)) throw e;
    } finally {
      window.requestAnimationFrame(window.ftmgr.frameHandler);
    }
  };
})()
