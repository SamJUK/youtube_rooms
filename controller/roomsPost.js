module.exports = (req, res) => {
  // @TODO: VALIDATE VALIDATE VALIDATE
  var uid = req.session.uid;
  var roomName = req.body.room;
  
  // Already Exists so Just Join the room
  // @TODO: Check if room is public
  if(rooms.hasOwnProperty(roomName)){
    res.redirect(`/room/${roomName}`); 
    return;
  }

  // Create Room
  require('./createRoom')(req, res);
};
