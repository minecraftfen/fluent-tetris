// Touch
(()=>{
  window.ft.ctrl.touch = {
    active: false,
    toggle: (bool = null)=>{
      if(window.ft.ctrl.touch.active === bool) return;
      active = bool === null ? !active : bool;
    },
  };
  window.addEventListener('keydown',()=>{
    window.ft.ctrl.touch.toggle(false);
  });
  document.addEventListener('touchstart', () => {
    window.ft.ctrl.touch.toggle(true);
  });
})();
