module.exports = (uid, data) => {
  console.log('Set video progress: ' + data.timestamp);
  if(!data || !data.timestamp) return;

  rooms[users[uid].room].room.videoprogress.vtime = data.timestamp;
  rooms[users[uid].room].room.videoprogress.time = (new Date).getTime();
  rooms[users[uid].room].lastInteraction = (new Date()).getTime();
  io.emit( 'set_video_progress', data.timestamp );
};
