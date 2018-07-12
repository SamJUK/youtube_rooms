/**
 * Function to clean up abandoned rooms
 */
let time_helper = require('../time');
let rooms_helper = require('../rooms.js');
module.exports = () => {

  console.log('Users Cron Run');

  // const time_to_neglected = 5 * time_helper.minute;
  const time_to_neglected = 10 * time_helper.second;
  let room_update_count = 0;

  for (var room in rooms) {

    console.log(rooms[room]);
    console.log(time_helper.hasTimeElapsed(rooms[room].lastInteraction, (new Date().getTime()), time_to_neglected));

    if(rooms[room].users.length > 0) continue;
    if(!time_helper.hasTimeElapsed(rooms[room].lastInteraction, (new Date().getTime()), time_to_neglected)) continue;

    console.log(`GC :: Room: ${room} has been deleted as its been abandoned`);
    room_update_count++;
    delete rooms[room];
  }

  if(room_update_count > 0){
    io.emit( 'cl_update_rooms', rooms_helper.getRoomsListHTML());
  }


};
