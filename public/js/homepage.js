// Scopyz
(()=>{
  let socket;
  let alias;
  let alias_input;
  let alias_button;
  let create_input;
  let create_button;
  let join_input;
  let join_button;
  let rooms_list;

  const init = function(){
    socket = io();
    alias = $('#alias');
    alias_input = $('#alias_input');
    alias_button = $('#alias_button');
    create_input = $('#create_input');
    create_button = $('#create_button');
    join_input = $('#join_input');
    join_button = $('#join_button');
    rooms_list = $('#rooms_list');
    bindUserInterface();
    setupEventHandlers();
    window.socketz = socket;
  };

  const setupEventHandlers = function(){
    socket.on( 'cl_set_alias', handle_set_alias );
    socket.on( 'cl_update_rooms', handle_update_rooms );
  };

  const bindUserInterface = function(){
    alias_button.click( set_alias );
    create_button.click( create_room );
    join_button.click ( join_room );
  };

  const set_alias = function(){
    // @TODO: Do validation here and that jazzy stuff
    socket.emit( 'sv_set_alias', alias_input.val() );
  };

  const create_room = function(){
    // @TODO: VALIDATE ALL THE THINGS
    socket.emit( 'sv_create_room', create_input.val() );
  };

  const join_room = function(){
    // @TODO: VALIDATTEEEEEE
    let room = join_input.val();
    window.location.href = `${window.location.origin}/room/${room}`;
  };

  const handle_set_alias = function(val){
    alias.text(val);
  };

  const handle_update_rooms = function(rooms_html){
    rooms_list[0].innerHTML = rooms_html;
  }



  init();
})();
