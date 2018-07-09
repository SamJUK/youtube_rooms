module.exports = socket => {
  console.log('New Connection');

  console.log(JSON.stringify(room));

  // Handle JIP Stuffings Turkey
  if(room && room.video) {
    socket.emit('video_update', room.video);
  }
  if(room && room.playbackstate) {
    socket.emit('set_playback_state', room.playbackstate);
  }
  if(room && room.videoprogress && room.videoprogress.vtime && room.videoprogress.time ) {

    let time = room.playbackstate === '0'
      ? room.videoprogress.vtime
      : (((new Date).getTime() - room.videoprogress.time) / 1000) + room.videoprogress.vtime;

    socket.emit('set_video_progress', time);
  }




  // Setup User Specific Event Handlers
  socket.on('set_video', require('./setVideo'));
  socket.on('set_playback_state', require('./changePlaybackState'));
  socket.on('set_video_progress', require('./setVideoProgress'));
  socket.on('disconnect', require('./disconnect'));
};
