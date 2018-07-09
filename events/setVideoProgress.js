module.exports = data => {
  console.log('Set video progress: ' + data.timestamp);
  if(!data || !data.timestamp) return;

  room.videoprogress.vtime = data.timestamp;
  room.videoprogress.time = (new Date).getTime();
  io.emit( 'set_video_progress', data.timestamp );
};
