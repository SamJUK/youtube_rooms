module.exports = data => {
  console.log('Change Playback State');
  if(!data || !data.state) return;

  rooms[users[uid].room].room.playbackstate = data.state;
  rooms[users[uid].room].room.videoprogress.vtime = data.timestamp;
  rooms[users[uid].room].room.videoprogress.time = (new Date).getTime();
  io.emit( 'set_playback_state', data.state );
};
