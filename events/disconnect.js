module.exports = uid => {

  // Leave Room
  let room = rooms[users[uid].room];
  if(room){
    if(room.users.includes(uid)){
      room.users.splice(room.users.indexOf(uid), 1);
    }
    users[uid].room = null;
    io.emit( 'cl_update_room_users', room.users );
  }

};
