// Scopyz
(()=>{
  let socket;

  const init = function(){
    socket = io();
    window.socketz = socket;
  };

  init();
})();
