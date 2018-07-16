// Scopyz
(()=>{
    let socket;
    let rooms_input;
    let rooms_button;
  
    const init = function(){
      socket = io();
      rooms_input = $('#room');
      rooms_button = $('label[for="room"]');
      bindUserInterface();
    };
  
    const bindUserInterface = function(){
      rooms_input.on('keyup', handle_input_keyup);
      rooms_button.click( handle_room_button );
    };
  
    const handle_input_keyup = function(event){
      // Only listen for enter
      if(event.keyCode !== 13) return;
  
      // @TODO: Validation Here
      handle_set_room();
    };
  
    const handle_room_button = function(){
      // @TODO: Validation Here
      handle_set_room();
    };
  
    const handle_set_room = function(){
      rooms_input.submit();
    };
  
    init();
  })();
  