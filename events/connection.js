module.exports = socket => {
  // Setup our new user
  let uid = socket.handshake.session.uid;
  socket.uid = uid;
  if(users[uid]){
    users[uid].socket = socket;
  }else{
    users[uid] = {
      socket: socket,
      created_at: (new Date()).getTime(),
      updated_at: (new Date()).getTime(),
      alias: null,
      room: null
    };
  }


  // Create UID if session has none :O
  // console.log('New Connection, UID: ' + uid);
  // console.log('Socket Connection: ' + socket.handshake.session.uid);
  socket.emit('sv_send_uid', uid);



  // Handle JIP Stuffings Turkey
  // if(room){
  //   if(room.video) {
  //     socket.emit('video_update', room.video);
  //   }
  //   if(room.playbackstate) {
  //     socket.emit('set_playback_state', room.playbackstate);
  //   }
  //   if(room.videoprogress && room.videoprogress.vtime && room.videoprogress.time ) {
  //
  //     let time = room.playbackstate === '0'
  //       ? room.videoprogress.vtime
  //       : (((new Date).getTime() - room.videoprogress.time) / 1000) + room.videoprogress.vtime;
  //
  //     socket.emit('set_video_progress', time);
  //   }
  // }


  // Setup User Specific Event Handlers
  // Video Page
  socket.on('set_video', require('./setVideo').bind(this, socket.uid));
  socket.on('set_playback_state', require('./changePlaybackState').bind(this, socket.uid));
  socket.on('set_video_progress', require('./setVideoProgress').bind(this, socket.uid));
  socket.on('disconnect', require('./disconnect').bind(this, socket.uid));

  // Homepage
  socket.on('sv_set_alias', require('./setAlias').bind(this, socket.uid));

  socket.on('debug', require('./debug'));
};
