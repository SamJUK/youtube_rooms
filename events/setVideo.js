module.exports = (uid, data) => {
  console.log('Set video request');
  if(!data || !data.video) return;

  rooms[users[uid].room].room.video = data.video;
  rooms[users[uid].room].room.playbackstate = '1';
  rooms[users[uid].room].room.videoprogress.vtime = 0;
  rooms[users[uid].room].room.videoprogress.time = (new Date).getTime();
  io.emit( 'video_update', data.video );
};
