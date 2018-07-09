// Scope it
(()=>{
  let socket;
  let player;
  let progressInterval;
  let progressIntervalTimer = 500;
  let packet = {};
  let timeline;
  let videoid;
  let timelinepin;
  let setupinterval;
  let is_first_play = true;
  let seek_on_play = null;

  const init = function(){
    socket = io();
    timeline = $('#controls_timeline');
    timelinepin = timeline.find('.pin');
    videoid = $('#video_id');
    bindUserInterface();
    setupEventHandlers();
  };

  const bindUserInterface = function(){
    $('#set_video').click( handle_set_video );
    $('#controls_play').click( handle_play_pause );
    timeline.click( handle_seek );
  };


  const handle_set_video = function(){
    let temp = {};
    Object.assign(temp, packet);
    temp.video = videoid.val(); // @TODO: Some form of validation here?
    socket.emit('set_video', temp);
  };
  const handle_play_pause = function(){
    let temp = {};
    Object.assign(temp, packet);
    temp.state = $('#controls_play').attr('data-state'); // @TODO: Validation?
    temp.timestamp = player.getDuration() * (event.offsetX / event.target.offsetWidth);
    socket.emit('set_playback_state', temp);
  };
  const handle_seek = function(event){
    let temp = {};
    Object.assign(temp, packet);
    var video_percentage = player.getDuration() * (event.offsetX / event.target.offsetWidth);
    temp.timestamp = video_percentage;
    socket.emit('set_video_progress', temp);
  };


  // Event Handlers
  const setupEventHandlers = function(){
    socket.on( 'video_update', handle_video_update );
    socket.on( 'set_playback_state', handle_set_playback_state );
    socket.on( 'set_video_progress', handle_set_progress );
  };

  const handle_video_update = function(id){
    // Not Initalized yet
    if(!player || !player.hasOwnProperty('playVideo')) {
      setTimeout(()=>{
        handle_video_update(id);
      }, 500);
      return;
    }

    player.loadVideoById(id);
    videoid.val(id);
    is_first_play = true;
  };
  const handle_set_playback_state = function(state){
    // Not Initalized yet
    if(!player || !player.hasOwnProperty('playVideo')) {
      setTimeout(()=>{
        handle_set_playback_state(state);
      }, 500);
      return;
    }

    console.log('Playback State: '+state);
    var method = state === '0' ? 'playVideo' : 'pauseVideo';
    player[method]();
  };

  const handle_set_progress = function(timestamp){
    // Not Initalized yet
    if(!player || !player.hasOwnProperty('playVideo')) {
      setTimeout(()=>{
        handle_set_progress(timestamp);
      }, 500);
      return;
    }

    console.log('Set Progress: '+timestamp);
    if(typeof player.getPlayerState() !== 'undefined'){
      player.seekTo(timestamp);
    }else{
      seek_on_play = timestamp;
    }
  };

  const onYouTubeIframeAPIReady = function(){
    player = new YT.Player('player', {
       height: '390',
       width: '640',
       playerVars: {
         modestbranding: '1',
         disablekb: '0',
         controls : '0',
       },
       events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
       }
     });
    };
  const onPlayerReady = function(event){};
  const onPlayerStateChange = function(event){
      let button = $('#controls_play');
      if(event.data == YT.PlayerState.PLAYING) {
        if(seek_on_play !== null){
          player.seekTo(seek_on_play);
          seek_on_play = null;
          is_first_play = false;
        }
        if(is_first_play){
          player.seekTo(0);
          is_first_play = false;
        };
        button.text('Pause');
        button.attr('data-state', '1');
        setProgressUpdate(true);
      }else if(event.data == YT.PlayerState.PAUSED){
        button.text('Play');
        button.attr('data-state', '0');
        setProgressUpdate(false);
      }
  };

  const setProgressUpdate = function(bool){
    if(!bool){
      clearInterval(progressInterval);
      return;
    }

    progressInterval = setInterval(()=>{
      let percentage = player.getCurrentTime() / player.getDuration();
      timelinepin.css('left', (timeline[0].offsetWidth*percentage) + 'px');
    }, progressIntervalTimer);
  };


  // Export variables to global scope if needed
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  // Run Initalization stuff
  init();
})();
