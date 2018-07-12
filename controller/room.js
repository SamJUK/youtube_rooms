module.exports = (req, res) => {

  // Room does not Exist
  if(!rooms.hasOwnProperty(req.params.room)){
      console.log('Room Doesnt Exist');
      // @TODO: Set User Message On Redirect
      return res.redirect('/');
  }

  // @TODO: Is Room Private?

  users[req.session.uid].room = req.params.room;
  rooms[req.params.room].users.push(req.session.uid);
  io.emit( 'cl_update_room_users', rooms[req.params.room].users );


  let room = rooms[req.params.room].room;
  res.render(BASE_PATH + '/public/views/room', {
    uid: req.session.uid,
    alias: users[req.session.uid].alias,
    roomname: req.params.room,
    roomusers: rooms[req.params.room].users,
    videouid: room.video,
    videoplaybackstate: room.playbackstate,
    videoprogress: room.playbackstate === '0'
          ? room.videoprogress.vtime
          : (((new Date()).getTime() - room.videoprogress.time) / 1000) + room.videoprogress.vtime
  });
};
