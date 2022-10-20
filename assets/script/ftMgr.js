// Future Task Manager
(() => {
  window.ftmgr = {};
  window.ftmgr.workload = [];
  window.ftmgr.started = false;
  window.ftmgr.register = (handler, timestamp, async = true, repeat = null) => {
    if (typeof handler !== 'function') throw new TypeError('"Handler" must be a function');
    if (typeof timestamp !== 'number') throw new TypeError('"Timestamp" must be a number');
    if (typeof repeat !== 'number') throw new TypeError('"Repeat" must be a number');
    window.ftmgr.started = true;
    window.requestAnimationFrame(window.ftmgr.frameHandler);
    return window.ftmgr.workload.push({
      handler: handler,
      timestamp: timestamp,
      repeat: repeat,
      async: async,
    }) - 1;

  };
  window.ftmgr.unregister = (id) => {
    return delete window.ftmgr.workload[id];
  };
  window.ftmgr.checkNeeded = () => {
    if (window.ftmgr.workload.length === 0) window.ftmgr.started = false;
    return window.ftmgr.started;
  };
  window.ftmgr.frameHandler = (timestamp) => {
    if (!window.ftmgr.checkNeeded()) return;
    for (let i = 0; i < window.ftmgr.workload.length; i++) // Check All Workloads
      if (window.ftmgr.workload[i] !== undefined) { // Check is it valid
        if(window.ftmgr.workload[i].timestamp < timestamp) // Check should it triggered
          if(window.ftmgr.workload[i].async) // Check is it async
            (async () => {window.ftmgr.workload[i].handler(timestamp);})(); // Async call
          else window.ftmgr.workload[i].handler(timestamp); // aync call
        if(window.ftmgr.workload[i].repeat !== null) // Check should it be deleted
          window.ftmgr.workload[i].timestamp += window.ftmgr.workload[i].repeat; // Repeat
        else delete window.ftmgr.workload[i]; // Delete
      }
    window.requestAnimationFrame(window.ftmgr.frameHandler);
  };
})()
