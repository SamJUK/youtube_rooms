const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const path = require('path');
const Session = require('express-session');
const SessionStore = require('session-file-store')(Session);
const ios = require('socket.io-express-session');
const bodyParser = require('body-parser');


// Declare Globally
global.BASE_PATH = path.dirname(require.main.filename);
global.io = io;
global.rooms = {};
global.users = {};


// Setup Session Stuff
const session = Session({
  store: new SessionStore({
    path: BASE_PATH + '/tmp/sessions'
  }),
  secret: 'totallysecret',
  resave: true,
  saveUninitialized: true
});


// Setup Server
app.use(session);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(BASE_PATH + '/public'));
app.use(require('./helpers/session_init'));
app.use(require('./helpers/logger'));

http.listen(port, function(){
  console.log(`Base Path :${BASE_PATH}`);
  console.log('Listening on *:' + port);
});


// ROUTES
app.get('/', require('./controller/index'));
app.get('/rooms', require('./controller/rooms'));
app.get('/room/:room', require('./controller/room'));

app.post('/rooms', require('./controller/roomsPost'));
app.post('/alias', require('./controller/setAlias'));


// Event Handlers
io.use(ios(session));
io.on('connection', require('./events/connection'));


// Cron Style Thing
require('./helpers/crony')();
