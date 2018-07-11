// Scopyz
(()=>{
  let socket;
  let alias;
  let alias_input;
  let alias_button;
  let create_input;
  let create_button;

  const init = function(){
    socket = io();
    alias = $('#alias');
    alias_input = $('#alias_input');
    alias_button = $('#alias_button');
    create_input = $('#create_input');
    create_button = $('#create_button');
    bindUserInterface();
    setupEventHandlers();
    window.socketz = socket;
  };

  const setupEventHandlers = function(){
    socket.on( 'cl_set_alias', handle_set_alias );
  };

  const bindUserInterface = function(){
    alias_button.click( set_alias );
    create_button.click( create_room );
  };

  const set_alias = function(){
    // @TODO: Do validation here and that jazzy stuff
    socket.emit( 'sv_set_alias', alias_input.val() );
  };

  const create_room = function(){
    // @TODO: VALIDATE ALL THE THINGS
    socket.emit( 'sv_create_room', create_input.val() );
  };

  const handle_set_alias = function(val){
    alias.text(val);
  };



  init();
})();
