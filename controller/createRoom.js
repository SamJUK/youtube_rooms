module.exports = (req, res) => {
  var uid = req.session.uid;

  // @TODO: VALIDATE VALIDATE VALIDATE
  var roomName = req.body.room;
  console.log(`Create Room: ${roomName} | UID: ${uid}`);

  rooms[roomName] = {
    owner: uid,
    public: false,
    users: [],
    lastInteraction: (new Date()).getTime(),
    room: {
      video: '',
      playbackstate: '0',
      videoprogress: { vtime: 0, time: 0 }
    }
  };

  res.redirect(`/room/${roomName}`);
};
