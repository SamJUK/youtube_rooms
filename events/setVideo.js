module.exports = data => {
  console.log('Set video request');
  if(!data || !data.video) return;

  room.video = data.video;
  room.playbackstate = '1';
  room.videoprogress.vtime = 0;
  room.videoprogress.time = (new Date).getTime();
  io.emit( 'video_update', data.video );
};
