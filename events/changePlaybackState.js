module.exports = data => {
  console.log('Change Playback State');
  if(!data || !data.state) return;

  room.playbackstate = data.state;
  room.videoprogress.vtime = data.timestamp;
  room.videoprogress.time = (new Date).getTime();
  io.emit( 'set_playback_state', data.state );
};
