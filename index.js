const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const path = require('path');

// Declare Globally
global.BASE_PATH = path.dirname(require.main.filename);
global.io = io;
global.room = { video: '', playbackstate: '0' , videoprogress: { vtime: 0, time: 0 } };

// Setup Server
app.use(express.static(BASE_PATH + '/public'));
http.listen(port, function(){
  console.log(`Base Path :${BASE_PATH}`);
  console.log('Listening on *:' + port);
});


// ROUTES
app.get('/', require('./controller/index'));


// Event Handlers
io.on('connection', require('./events/connection'));
