// Scopyz
(()=>{
  let socket;
  let alias_input;
  let alias_button;

  const init = function(){
    socket = io();
    alias_input = $('#alias');
    alias_button = $('label[for="alias"]');
    bindUserInterface();
  };

  const bindUserInterface = function(){
    alias_input.on('keyup', handle_input_keyup);
    alias_button.click( handle_alias_button );
  };

  const handle_input_keyup = function(event){
    // Only listen for enter
    if(event.keyCode !== 13) return;

    // @TODO: Validation Here
    handle_set_alias( alias_input.val() );
  };

  const handle_alias_button = function(){
    // @TODO: Validation Here
    handle_set_alias( alias_input.val() );
  };

  const handle_set_alias = function(){
    alias_input.submit();
  };

  const set_alias = function(){
    // @TODO: Do validation here and that jazzy stuff
    socket.emit( 'sv_set_alias', alias_input.val() );
  };


  init();
})();
